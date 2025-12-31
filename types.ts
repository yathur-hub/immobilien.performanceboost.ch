export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  VACANCY_CALC = 'VACANCY_CALC',
  ROI_CALC = 'ROI_CALC'
}

export interface VacancyData {
  units: number;
  avgRent: number;
  durationMonths: number;
  optimizedDurationMonths: number;
}

export interface ROIData {
  budget: number;
  cpc: number;
  conversionRateWeb: number;
  conversionRateSales: number;
  avgDealValue: number;
}

export interface CampaignInput {
  projectType: string;
  location: string;
  usp: string;
  targetAudience: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  fill?: string;
}