import { useParams } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { FiHeart } from 'react-icons/fi';
import Accordion from '../components/common/Accordion';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner'; 

const ProductDetailPage = () => {
    const { t } = useTranslation();
    const { productId } = useParams<{ productId: string }>();
    const { products, isLoading, error } = useProducts();
    const { addItem } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [quantity, setQuantity] = useState(1);
    
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const product = products.find(p => p.id === Number(productId));

    useEffect(() => {
        if (product) {
            setSelectedImage(product.image);
            setQuantity(1);
        }
    }, [product]);

    if (isLoading) return <div className="py-20 text-center">Loading...</div>;
    if (error) return <div className="py-20 text-center text-red-500">Error: {error}</div>;

    if (!product) {
        return <div className="py-20 text-center">Product not found.</div>;
    }

    const isWishlisted = isInWishlist(product.id);

    const handleAddToCart = () => {
        addItem(product, quantity);
        toast.success(t('toast.item_added_to_cart', {
            name: product.name,
            quantity: quantity
        }));
    };
    
    const galleryImages = [product.image, ...(product.images || [])];

    return (
        <div className="container px-4 py-12 mx-auto">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                
                <div className="flex flex-col-reverse gap-4 md:flex-row">
                    <div className="flex gap-3 md:flex-col">
                        {galleryImages.map((img, index) => (
                            <div 
                                key={index} 
                                className={`w-20 h-20 border-2 rounded-md cursor-pointer
                                    ${selectedImage === img ? 'border-primary' : 'border-transparent'}`
                                }
                                onClick={() => setSelectedImage(img)}
                            >
                                <img src={img} alt={`${product.name} view ${index + 1}`} className="object-cover w-full h-full rounded-sm" />
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-center flex-grow bg-white rounded-lg">
                        <img src={selectedImage || product.image} alt={product.name} className="w-full max-h-[100vh] object-contain"/>
                    </div>
                </div>
                <div className="lg:sticky lg:top-24 h-fit">
                    <h1 className="text-4xl font-bold text-dark">{product.name}</h1>
                    <p className="mt-2 mb-4 text-lg text-gray-500">{product.category}</p>
                    
                    <div className="flex items-baseline gap-3 mb-6">
                        <span className="text-3xl font-bold text-dark">${product.price.toFixed(2)}</span>
                        {product.oldPrice && (
                            <span className="text-xl text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                        )}
                    </div>
                    
                    <div className="p-6 bg-gray-100 rounded-lg">
                        <div className="flex items-stretch gap-3 mb-4">
                            <div className="flex border border-gray-300 rounded-md">
                                <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="px-5 py-3 text-lg text-gray-500 transition-colors hover:bg-gray-100">-</button>
                                <span className="flex items-center justify-center w-16 px-2 text-lg font-semibold text-center border-l border-r border-gray-300">{quantity}</span>
                                <button onClick={() => setQuantity(prev => prev + 1)} className="px-5 py-3 text-lg text-gray-500 transition-colors hover:bg-gray-100">+</button>
                            </div>
                            <button onClick={() => toggleWishlist(product)} className="flex items-center justify-center p-4 border border-gray-300 rounded-md hover:bg-gray-100">
                                <FiHeart size={22} className={`transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                            </button>
                        </div>
                        <button 
                            onClick={handleAddToCart}
                            className="w-full px-8 py-4 text-lg font-bold text-white transition-opacity rounded-md bg-primary hover:opacity-90"
                        >
                            Add to Cart
                        </button>
                    </div>

                    <div className="mt-8">
                        <Accordion title="Product details" defaultOpen={true}>
                            <p>{product.description}</p>
                        </Accordion>
                        <Accordion title="Measurements">
                            <p>Width: 60 cm, Depth: 55 cm, Height: 78 cm. (Example text)</p>
                        </Accordion>
                        <Accordion title="Reviews">
                            <p>No reviews yet.</p>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;