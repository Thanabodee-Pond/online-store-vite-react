import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Product } from '../types';

type ProductTranslation = {
  id: number;
  name: string;
  description: string;
};

interface UseProductsReturn {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

export const useProducts = (): UseProductsReturn => {
  const { i18n } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const currentLang = i18n.language;

        const baseDataResponse = await fetch('/products_en.json');
        if (!baseDataResponse.ok) throw new Error('Could not fetch base product data.');
        const baseData: Product[] = await baseDataResponse.json();

        if (currentLang === 'en') {
          setProducts(baseData);
          return;
        }

        const translatedDataResponse = await fetch(`/products_${currentLang}.json`);
        if (!translatedDataResponse.ok) {
            console.warn(`Translation file for ${currentLang} not found. Falling back to English.`);
            setProducts(baseData);
            return;
        }
        const translatedData: ProductTranslation[] = await translatedDataResponse.json();
        
        const mergedProducts = baseData.map(baseProduct => {
          const translation = translatedData.find(t => t.id === baseProduct.id);
          return translation 
            ? { 
                ...baseProduct, 
                name: translation.name, 
                description: translation.description 
              } 
            : baseProduct;
        });

        setProducts(mergedProducts);

      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [i18n.language]);

  return { products, isLoading, error };
};