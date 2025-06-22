import ProductCard from '../components/product/ProductCard';
import Sidebar from '../components/product/Sidebar';
import ShopTopBar from '../components/product/ShopTopBar';
import { useProducts } from '../hooks/useProducts';
import { useFilters } from '../context/FilterContext';

const ProductsPage = () => {
  const { products, isLoading, error } = useProducts();
  const { searchTerm, category, sortBy } = useFilters();

  const processedProducts = products
    .filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(product =>
      category === 'all' ? true : product.category === category
    )
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  if (isLoading) return <div className="py-10 text-center">Loading products...</div>;
  if (error) return <div className="py-10 text-center text-red-500">Error: {error}</div>;
  
  return (
    <div className="container px-4 py-12 mx-auto">
      {/* เปลี่ยนจาก grid เป็น flex-col สำหรับ mobile และ flex-row สำหรับ desktop */}
      <div className="flex flex-col gap-8 lg:flex-row">
        
        {/* Column 1: Sidebar */}
        <div className="w-full lg:w-1/4">
          <Sidebar />
        </div>

        {/* Column 2: Main Content */}
        <div className="w-full lg:w-3/4">
          <ShopTopBar />
          
          {processedProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {processedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-center text-gray-500">No products found.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductsPage;