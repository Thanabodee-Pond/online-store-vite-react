import type { Product } from '../../types';
import { FiShoppingCart, FiHeart, FiZoomIn } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useQuickView } from '../../context/QuickViewContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { openModal } = useQuickView();
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="text-center group">
      <div className="relative overflow-hidden bg-white border border-gray-200 rounded-lg">
        <Link to={`/product/${product.id}`}>
            <div className="p-8 transition-transform duration-500 ease-in-out aspect-square group-hover:scale-105">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain w-full h-full" 
                />
            </div>
        </Link>
        
        {product.tag && (
          <span className="absolute px-3 py-1 text-xs font-bold text-white rounded-md top-4 left-4 bg-primary">
            {product.tag}
          </span>
        )}
        
        <div className="absolute flex items-center justify-center gap-2 transition-all duration-300 transform -translate-x-1/2 bg-white rounded-full shadow-lg opacity-0 bottom-5 left-1/2 group-hover:opacity-100 group-hover:bottom-8">
          <button onClick={() => addItem(product)} className="p-3 text-gray-600 transition-colors rounded-full hover:bg-gray-200 hover:text-primary" aria-label="Add to cart">
            <FiShoppingCart size={20} />
          </button>
          <button onClick={() => toggleWishlist(product)} className="p-3 text-gray-600 transition-colors rounded-full hover:bg-gray-200 hover:text-primary" aria-label="Add to wishlist">
            <FiHeart size={20} className={`transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
          <button onClick={() => openModal(product)} className="p-3 text-gray-600 transition-colors rounded-full hover:bg-gray-200 hover:text-primary" aria-label="Quick view">
            <FiZoomIn size={20} />
          </button>
        </div>
      </div>

      <div className="pt-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold transition-colors cursor-pointer text-dark hover:text-primary">{product.name}</h3>
        </Link>
        <div className="flex items-center justify-center gap-2 mt-1">
          {product.oldPrice ? (
            <>
              <span className="font-bold text-primary">${product.price.toFixed(2)}</span>
              <span className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-bold text-dark">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;