// src/context/WishlistContext.tsx
import React, { createContext, useReducer, useEffect, useContext, ReactNode } from 'react';
import { Product } from '../types';

interface WishlistState {
  items: Product[];
}

type WishlistAction =
  | { type: 'TOGGLE_WISHLIST'; payload: Product };

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'TOGGLE_WISHLIST': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // ถ้ามีอยู่แล้ว ให้ลบออก
        return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
      } else {
        // ถ้าไม่มี ให้เพิ่มเข้าไป
        return { ...state, items: [...state.items, action.payload] };
      }
    }
    default:
      return state;
  }
};

interface WishlistContextType {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const initialState: WishlistState = { items: [] }; // Wishlist ไม่ต้องเซฟลง localStorage ก็ได้
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  const toggleWishlist = (product: Product) => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
  };

  const isInWishlist = (productId: number) => {
    return state.items.some(item => item.id === productId);
  };

  const contextValue: WishlistContextType = {
    items: state.items,
    toggleWishlist,
    isInWishlist,
  };

  return <WishlistContext.Provider value={contextValue}>{children}</WishlistContext.Provider>;
};

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};