export enum CaseMaterial {
  Silicone = 'Silicone',
  HardShell = 'Hard Shell',
  Tough = 'Tough Armor',
  Eco = 'Biodegradable'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  trending: boolean;
}

export interface DesignIdea {
  title: string;
  description: string;
  colorPalette: string[];
}
