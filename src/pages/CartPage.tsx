import { useCart } from '../context/CartContext';
import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CartPage = () => {
  const { t } = useTranslation();
  const { items, removeItem, updateQuantity } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container px-4 py-20 mx-auto">
      <h1 className="mb-12 text-4xl font-bold text-center">{t('cart_page.title')}</h1>

      {items.length === 0 ? (
        <div className="text-center text-gray-500">
            <p className="text-xl">{t('cart_page.empty_cart')}</p>
            <Link to="/products" className="inline-block px-8 py-3 mt-6 font-bold text-white transition-opacity rounded-md bg-primary hover:opacity-90">
              {t('cart_page.continue_shopping')}
            </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-12 lg:flex-row">
          
          <div className="flex-grow">
            <div className="hidden grid-cols-6 gap-4 pb-4 font-bold text-left text-gray-500 uppercase border-b md:grid">
                <div className="col-span-3">{t('cart_page.product')}</div>
                <div>{t('cart_page.price')}</div>
                <div>{t('cart_page.quantity')}</div>
                <div className="text-right">{t('cart_page.subtotal')}</div>
            </div>
            {items.map(item => (
              <div key={item.id} className="grid items-center grid-cols-2 gap-4 py-6 border-b md:grid-cols-6">
                <div className="flex items-center col-span-2 gap-4 md:col-span-3">
                  <img src={item.image} alt={item.name} className="object-cover w-20 h-20 rounded-md"/>
                  <div>
                    <h2 className="font-bold text-dark">{item.name}</h2>
                    <button onClick={() => removeItem(item.id)} className="flex items-center gap-1 mt-1 text-sm text-red-500 hover:underline">
                      <FiTrash2 size={14}/> {t('cart_page.remove')}
                    </button>
                  </div>
                </div>
                <div className="text-gray-600">${item.price.toFixed(2)}</div>
                <div className="flex items-center border rounded-md w-fit">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 text-gray-500 hover:bg-gray-100">-</button>
                  <span className="w-10 px-2 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-gray-500 hover:bg-gray-100">+</button>
                </div>
                <div className="font-bold text-right text-dark">${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="w-full p-8 bg-gray-100 rounded-lg lg:w-1/3 h-fit">
            <h2 className="pb-4 mb-6 text-2xl font-bold border-b">{t('cart_page.order_summary')}</h2>
            <div className="flex justify-between mb-4 text-lg">
              <span>{t('cart_page.subtotal')}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-6 text-lg">
              <span>{t('cart_page.shipping')}</span>
              <span>{t('cart_page.free')}</span>
            </div>
            <div className="flex justify-between pt-6 text-2xl font-bold border-t">
              <span>{t('cart_page.total')}</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Link to="/checkout" className="block w-full py-4 mt-8 font-bold text-center text-white rounded-md bg-primary hover:opacity-90">
              {t('cart_page.proceed_to_checkout')}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;