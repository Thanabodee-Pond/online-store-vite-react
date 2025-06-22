// src/types/index.ts

export interface Product {
    id: number;
    name: string;
    price: number;
    oldPrice?: number; 
    image: string; // รูปภาพหลัก
    images?: string[]; // อัลบั้มรูป (อาจจะมีหรือไม่มีก็ได้)
    image: string;
    description: string;
    category: string;
    tag?: 'New' | 'Sale'; // tag เป็น optional อาจจะมีหรือไม่มีก็ได้
  }

export interface CartItem extends Product {
    quantity: number;
}