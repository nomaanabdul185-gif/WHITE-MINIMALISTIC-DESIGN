export type PropertyType = 'Residential' | 'Commercial' | 'Farm Stays';
export type ProjectType = 'Renovations' | 'New Homes';
export type HomeType = '2 BHK' | '3 BHK' | 'Villa';
export type BudgetType = 'Affordable' | 'Premium' | 'Luxury';
export type DesignChoiceType = 'Regular Design' | 'Trending' | 'Designer Choice';
export type StyleType = 'Modern' | 'Minimal' | 'Traditional' | 'Japandi';

export interface DesignItem {
  id: string;
  title: string;
  category: string;
  property: PropertyType;
  project: ProjectType;
  homeType: HomeType;
  budget: BudgetType;
  designChoice: DesignChoiceType;
  style: StyleType;
  location: string;
  area: string;
  price: number;
  image: string;
  description: string;
  highlights?: string[];
  dimensions?: string;
  timeline?: string;
}

export interface BriefSelection {
  property: PropertyType;
  project: ProjectType;
  homeType: HomeType;
  budget: BudgetType;
  designChoice: DesignChoiceType;
  style: StyleType;
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  property: PropertyType;
  project?: ProjectType;
  budget?: BudgetType;
  message: string;
  design?: string;
  submittedAt: string;
}
