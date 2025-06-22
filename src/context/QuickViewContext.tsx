import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '../types';

interface QuickViewContextType {
  isOpen: boolean;
  product: Product | null;
  openModal: (product: Product) => void;
  closeModal: () => void;
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined);

export const QuickViewProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  const openModal = (productToView: Product) => {
    console.log("Opening Quick View for:", productToView.name);
    setProduct(productToView);
    setIsOpen(true);
  };

  const closeModal = () => {
    console.log("Closing Quick View"); 
    setIsOpen(false);
    setProduct(null);
  };

  const value = { isOpen, product, openModal, closeModal };

  return (
    <QuickViewContext.Provider value={value}>
      {children}
    </QuickViewContext.Provider>
  );
};

export const useQuickView = (): QuickViewContextType => {
  const context = useContext(QuickViewContext);
  if (context === undefined) {
    throw new Error('useQuickView must be used within a QuickViewProvider');
  }
  return context;
};