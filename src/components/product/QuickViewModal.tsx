// src/components/product/QuickViewModal.tsx

import { useState, useEffect } from 'react';
import { useQuickView } from '../../context/QuickViewContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { FiX, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const QuickViewModal = () => {
  const { isOpen, product, closeModal } = useQuickView();
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // รีเซ็ตจำนวนเป็น 1 ทุกครั้งที่ Modal เปิดสำหรับสินค้าใหม่
    if (isOpen) {
        setQuantity(1);
    }
  }, [isOpen, product]);

  if (!isOpen || !product) {
    return null;
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
    alert(`${quantity} ${product.name}(s) added to cart!`);
    closeModal();
  };
  
  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-lg shadow-2xl m-4">
        <button 
          onClick={closeModal} 
          className="absolute z-10 text-2xl text-gray-500 top-4 right-4 hover:text-dark"
        >
          <FiX />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 overflow-y-auto max-h-[90vh]">
          {/* Product Image Gallery */}
          <div>
            <div className="w-full h-[300px] md:h-full bg-gray-100 rounded-lg flex items-center justify-center">
                <img src={product.image} alt={product.name} className="object-contain max-w-full max-h-full" />
            </div>
            {/* Placeholder for thumbnails */}
            {/* <div className="flex gap-2 mt-2"> ... </div> */}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h2 className="mb-2 text-3xl font-bold text-dark">{product.name}</h2>
            
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-2xl font-semibold text-primary">${product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-lg text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="mb-6 leading-relaxed text-gray-600">{product.description}</p>
            
            <hr className="my-6" />

            <div className="flex items-stretch gap-3">
              {/* Quantity Selector */}
              <div className="flex border border-gray-300 rounded-md">
                <button 
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))} 
                  className="px-4 text-lg text-gray-500 transition-colors hover:bg-gray-100"
                >
                  -
                </button>
                <span className="flex items-center justify-center w-12 px-2 text-lg font-semibold text-center border-l border-r border-gray-300">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(prev => prev + 1)} 
                  className="px-4 text-lg text-gray-500 transition-colors hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button 
                onClick={handleAddToCart}
                className="flex items-center justify-center flex-grow px-6 text-base font-bold text-white transition-opacity rounded-md bg-primary hover:opacity-90"
              >
                Add to Cart
              </button>

              {/* Wishlist Button */}
              <button 
                onClick={() => toggleWishlist(product)} 
                className="flex items-center justify-center p-3 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                <FiHeart size={20} className={`transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
              </button>
            </div>
            
            <Link 
              to={`/product/${product.id}`} 
              onClick={closeModal} 
              className="mt-8 text-center text-primary hover:underline"
            >
              View full details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;