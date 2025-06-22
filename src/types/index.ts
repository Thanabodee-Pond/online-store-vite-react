export interface Product {
    id: number;
    name: string;
    price: number;
    oldPrice?: number; 
    image: string;
    images?: string[]; 
    image: string;
    description: string;
    category: string;
    tag?: 'New' | 'Sale'; 
  }

export interface CartItem extends Product {
    quantity: number;
}