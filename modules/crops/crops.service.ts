import { BaseService } from '@/lib/services/base.service';
import { ICrop, CropCategory, Season, WaterNeed, NotFoundError } from '@/lib/types';
import { cropGuide as mockCrops } from '@/lib/admin-data';

/**
 * Crops Service - handles crop guides and information
 */
export class CropsService extends BaseService<ICrop> {
  constructor() {
    super('Crop', mockCrops);
  }

  /**
   * Get crops by category
   */
  async getByCategory(category: CropCategory): Promise<ICrop[]> {
    return this.data.filter(c => c.category === category);
  }

  /**
   * Get crops by season
   */
  async getBySeason(season: Season): Promise<ICrop[]> {
    return this.data.filter(c => c.season === season);
  }

  /**
   * Get crops by water need
   */
  async getByWaterNeed(waterNeed: WaterNeed): Promise<ICrop[]> {
    return this.data.filter(c => c.waterNeed === waterNeed);
  }

  /**
   * Get crops suitable for temperature range
   */
  async getSuitableForTemperature(minTemp: number, maxTemp: number): Promise<ICrop[]> {
    return this.data.filter(c =>
      c.temperature.min <= maxTemp && c.temperature.max >= minTemp
    );
  }

  /**
   * Get crops for soil types
   */
  async getForSoilTypes(soilTypes: string[]): Promise<ICrop[]> {
    return this.data.filter(c =>
      soilTypes.some(soil => c.soilType.includes(soil))
    );
  }

  /**
   * Find crops by name or scientific name
   */
  async search(query: string): Promise<ICrop[]> {
    return this.search(query, ['name', 'scientificName'] as any);
  }

  /**
   * Filter crops with multiple criteria
   */
  async filterCrops(filters: {
    category?: CropCategory;
    season?: Season;
    waterNeed?: WaterNeed;
    minTemp?: number;
    maxTemp?: number;
    soilType?: string;
    search?: string;
  }): Promise<ICrop[]> {
    let results = [...this.data];

    if (filters.category) {
      results = results.filter(c => c.category === filters.category);
    }

    if (filters.season) {
      results = results.filter(c => c.season === filters.season);
    }

    if (filters.waterNeed) {
      results = results.filter(c => c.waterNeed === filters.waterNeed);
    }

    if (filters.minTemp !== undefined || filters.maxTemp !== undefined) {
      results = results.filter(c => {
        const min = filters.minTemp ?? -Infinity;
        const max = filters.maxTemp ?? Infinity;
        return c.temperature.min <= max && c.temperature.max >= min;
      });
    }

    if (filters.soilType) {
      results = results.filter(c => c.soilType.includes(filters.soilType!));
    }

    if (filters.search) {
      const lowerSearch = filters.search.toLowerCase();
      results = results.filter(c =>
        c.name.toLowerCase().includes(lowerSearch) ||
        c.scientificName.toLowerCase().includes(lowerSearch)
      );
    }

    return results;
  }

  /**
   * Get crop with disease management info
   */
  async getCropWithManagement(id: string): Promise<ICrop & { managementPlan: string }> {
    const crop = await this.getById(id);
    return {
      ...crop,
      managementPlan: this.generateManagementPlan(crop),
    };
  }

  /**
   * Generate management plan for crop
   */
  private generateManagementPlan(crop: ICrop): string {
    const lines = [
      `Management Plan for ${crop.name}`,
      `Season: ${crop.season}`,
      `Duration: ${crop.duration}`,
      `Water Need: ${crop.waterNeed}`,
      `Soil Types: ${crop.soilType.join(', ')}`,
      '',
      'Common Diseases to Monitor:',
      ...crop.commonDiseases.map(d => `- ${d}`),
      '',
      'Pest Management Strategies:',
      ...crop.pestManagement.map(p => `- ${p}`),
      '',
      `Harvest Time: ${crop.harvestTime}`,
      `Expected Yield: ${crop.yield}`,
    ];
    return lines.join('\n');
  }

  /**
   * Get crop statistics
   */
  async getCropStats(): Promise<{
    total: number;
    byCategory: Record<CropCategory, number>;
    bySeason: Record<Season, number>;
  }> {
    const categories = ['cereals', 'pulses', 'vegetables', 'fruits', 'oilseeds', 'spices'] as CropCategory[];
    const seasons = ['kharif', 'rabi', 'zaid'] as Season[];

    return {
      total: this.data.length,
      byCategory: categories.reduce((acc, cat) => {
        acc[cat] = this.data.filter(c => c.category === cat).length;
        return acc;
      }, {} as Record<CropCategory, number>),
      bySeason: seasons.reduce((acc, season) => {
        acc[season] = this.data.filter(c => c.season === season).length;
        return acc;
      }, {} as Record<Season, number>),
    };
  }

  /**
   * Get recommendations for farmer conditions
   */
  async getRecommendations(conditions: {
    temperature: number;
    soilType: string;
    waterAvailability: WaterNeed;
    season: Season;
  }): Promise<ICrop[]> {
    return this.data.filter(c =>
      c.season === conditions.season &&
      c.waterNeed === conditions.waterAvailability &&
      c.soilType.includes(conditions.soilType) &&
      c.temperature.min <= conditions.temperature &&
      c.temperature.max >= conditions.temperature
    );
  }
}

/**
 * Export singleton instance
 */
export const cropsService = new CropsService();
