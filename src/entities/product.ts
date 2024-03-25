export interface Product {
  id: number;
  name: string;
  unit: string;
  price: number;
  active: boolean | number;
  availableQuantity: number;
  quantity: number;
  category: string;
}
