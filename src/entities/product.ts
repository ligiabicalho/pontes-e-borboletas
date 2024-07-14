export interface Product {
  id: number;
  name: string;
  unit: string;
  price: number;
  priceIpb: number;
  active: boolean | number;
  availableQuantity: number;
  quantity: number;
  category: string;
}
