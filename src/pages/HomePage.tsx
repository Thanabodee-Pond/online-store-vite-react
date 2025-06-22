// src/pages/HomePage.tsx

import ProductCard from '../components/product/ProductCard';
import { useProducts } from '../hooks/useProducts';
import { useFilters } from '../context/FilterContext';
import FilterControls from '../components/product/FilterControls';
import HeroSlider from '../components/common/HeroSlider';
import SupportArea from '../components/common/SupportArea';
import { useTranslation } from 'react-i18next';

const HomePage = () => {
    const { t } = useTranslation();
    const { products, isLoading, error } = useProducts();
    const { searchTerm, category, sortBy } = useFilters();

    const processedProducts = products
        // ... (ส่วน logic เหมือนเดิม) ...
        .sort((a, b) => {
            if (sortBy === 'price-asc') return a.price - b.price;
            if (sortBy === 'price-desc') return b.price - a.price;
            return 0;
        });

    if (isLoading) return <div className="py-10 text-center">Loading products...</div>;
    if (error) return <div className="py-10 text-center text-red-500">Error: {error}</div>;

    return (
        <>
            <HeroSlider />
            <SupportArea />
            {/* --- แก้ไขส่วนนี้ --- */}
            <div className="container px-4 py-24 mx-auto ">
                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-bold text-dark">{t('products_page.our_products')}</h2>
                    <p className="mt-2 text-lg text-gray-500">{t('products_page.collection_desc')}</p>
                </div>

                <FilterControls />

                {processedProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {processedProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">{t('products_page.no_products_found')}</p>
                )}
            </div>
        </>
    );
};

export default HomePage;