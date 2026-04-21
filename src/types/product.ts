export interface ProductSpec {
  powerW: number;
  sizeMm: string;
  voltage: string;
  heatingArea: string;
}

export type ProductLine = 'excellent' | 'mas' | 'personal';
export type InstallationType = 'embedded' | 'exposed' | 'wall-mounted' | 'desk';

export interface Product {
  id: string;
  name: string;
  category: string;
  summary: string;
  applications: string[];
  specs: ProductSpec;
  productLine?: ProductLine;
  installationType?: InstallationType;
  procurementId?: string;
  thumbnailImage?: string;
  detailImage?: string;
  detailDescription?: string;
  featureBullets?: string[];
}
