import { NextResponse } from 'next/server';

const mockSchemes = [
  {
    id: '1',
    title: 'PM-KISAN: Pradhan Mantri Kisan Samman Nidhi',
    description:
      'Income support to farmers with direct cash transfer of ₹6000 per year in three equal installments.',
    eligibility:
      'All landholding farmers regardless of income, except high-income groups',
    benefits: '₹6000 per year in 3 installments of ₹2000',
    deadline: '2024-12-31',
    category: 'Income Support',
  },
  {
    id: '2',
    title: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
    description:
      'Comprehensive insurance protection against failed monsoons and other calamities.',
    eligibility: 'All farmers growing notified crops in notified areas',
    benefits: 'Up to 90% of crop loss coverage',
    deadline: '2024-10-15',
    category: 'Insurance',
  },
  {
    id: '3',
    title: 'Sub-Mission on Agricultural Mechanization',
    description: 'Subsidy on purchase of agricultural machinery and equipment.',
    eligibility:
      'Small and marginal farmers, SCs/STs with priority to women farmers',
    benefits: '20-50% subsidy on machinery cost',
    deadline: '2024-11-30',
    category: 'Equipment',
  },
  {
    id: '4',
    title: 'Soil Health Card Scheme',
    description:
      'Free soil testing and nutrient management recommendations for farmers.',
    eligibility: 'All farmers in registered areas',
    benefits: 'Free soil testing + nutrient recommendations',
    deadline: '2024-06-30',
    category: 'Technology',
  },
  {
    id: '5',
    title: 'e-NAM: Electronic National Agriculture Market',
    description: 'Online platform for buying and selling of agricultural products.',
    eligibility: 'All registered farmers',
    benefits: 'No transaction fees, transparent pricing',
    deadline: '2024-12-31',
    category: 'Marketing',
  },
  {
    id: '6',
    title: 'Pradhan Mantri Krishi Sinchayee Yojana',
    description: 'Irrigation infrastructure development with subsidy support.',
    eligibility:
      'Farmers with irrigation requirements, priority to marginal farmers',
    benefits: 'Up to 75% subsidy on irrigation infrastructure',
    deadline: '2024-09-30',
    category: 'Infrastructure',
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockSchemes,
  });
}
