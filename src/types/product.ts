export interface ProductSpec {
  powerW: number;
  sizeMm: string;
  voltage: string;
  heatingArea: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  summary: string;
  applications: string[];
  specs: ProductSpec;
}
