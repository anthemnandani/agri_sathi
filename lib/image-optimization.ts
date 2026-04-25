/**
 * Image Optimization Utility for Low Bandwidth
 * Uses emoji representations instead of heavy images
 */

export const getOptimizedImage = (
  imagePath: string | null,
  fallback: string = '📦'
): string => {
  // For low bandwidth, we use emoji representations
  // In production, implement actual image compression and progressive loading
  return imagePath || fallback;
};

/**
 * Generate a placeholder gradient based on category
 */
export const getCategoryGradient = (category: string): string => {
  const gradients: Record<string, string> = {
    tractor: 'from-green-100 to-green-200',
    harvester: 'from-yellow-100 to-yellow-200',
    cultivator: 'from-blue-100 to-blue-200',
    irrigation: 'from-cyan-100 to-cyan-200',
    thresher: 'from-green-100 to-green-200',
    sprayer: 'from-purple-100 to-purple-200',
    baler: 'from-indigo-100 to-indigo-200',
  };
  return gradients[category] || 'from-green-100 to-green-200';
};

/**
 * Lazy load images with intersection observer
 */
export const setupLazyLoading = () => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const imageElements = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          imageObserver.unobserve(img);
        }
      });
    });

    imageElements.forEach((img) => imageObserver.observe(img));
  }
};

/**
 * Compress data for transmission
 */
export const compressToolData = (tools: any[]) => {
  // Remove unnecessary fields for faster transmission
  return tools.map((tool) => ({
    id: tool.id,
    name: tool.name,
    price: tool.price,
    rating: tool.rating,
    reviews: tool.reviews,
    image: tool.image,
    owner: {
      name: tool.owner.name,
      village: tool.owner.village,
      distance: tool.owner.distance,
    },
  }));
};
