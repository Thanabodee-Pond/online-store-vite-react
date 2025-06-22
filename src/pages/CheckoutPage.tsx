// src/pages/CheckoutPage.tsx

import { useCart } from '../context/CartContext';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import generatePayload from 'promptpay-qr';
import { useTranslation } from 'react-i18next';

// กำหนด Type ของข้อมูลในฟอร์ม
type ShippingInputs = {
  firstName: string;
  lastName: string;
  address: string;
  city: string; // เพิ่ม city field ตาม type
  phone: string;
};

const CheckoutPage = () => {
  // 1. เรียกใช้ Hooks ทั้งหมดที่ด้านบนสุดของ Component
  const { t } = useTranslation();
  const { items, clearCart } = useCart();
  const { register, handleSubmit, formState: { errors } } = useForm<ShippingInputs>();
  const navigate = useNavigate();

  // State สำหรับควบคุม Modal และเก็บข้อมูล
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrCodeData, setQrCodeData] = useState('');
  const [currentOrder, setCurrentOrder] = useState<{ details: ShippingInputs, subtotal: number } | null>(null);

  // คำนวณค่าต่างๆ ที่ต้องใช้
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // สร้างฟังก์ชัน handler ที่จะใช้กับฟอร์ม
  const onSubmit: SubmitHandler<ShippingInputs> = data => {
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const promptPayId = '0876774924';
    const amount = subtotal;
    const payload = generatePayload(promptPayId, { amount });
    
    setQrCodeData(payload);
    setCurrentOrder({ details: data, subtotal: amount });
    setIsModalOpen(true);
  };

  // สร้างฟังก์ชันสำหรับยืนยันการชำระเงิน
  const handleConfirmPayment = () => {
    alert(t('checkout_page.payment_confirmed'));
    clearCart();
    setIsModalOpen(false);
    navigate('/');
  };

  // ส่วนของการแสดงผล JSX
  return (
    <>
      <div className="container px-4 py-24 mx-auto">
        <h1 className="mb-12 text-4xl font-bold text-center">{t('checkout_page.title')}</h1>
        
        {items.length === 0 && !isModalOpen ? (
          <div className="text-center text-gray-500">
            <p className="text-xl">{t('cart_page.empty_cart')}</p>
            <Link to="/products" className="inline-block px-8 py-3 mt-6 font-bold text-white transition-opacity rounded-md bg-primary hover:opacity-90">
              {t('cart_page.continue_shopping')}
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-16 lg:grid-cols-2">
            {/* Shipping Information */}
            <div>
              <h2 className="pb-4 mb-6 text-2xl font-semibold border-b">{t('checkout_page.shipping_info')}</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block mb-2 font-medium">{t('checkout_page.first_name')}</label>
                    <input {...register("firstName", { required: "First name is required" })} className="w-full p-3 border border-gray-300 rounded-md" />
                    {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block mb-2 font-medium">{t('checkout_page.last_name')}</label>
                    <input {...register("lastName", { required: "Last name is required" })} className="w-full p-3 border border-gray-300 rounded-md" />
                    {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName.message}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="address" className="block mb-2 font-medium">{t('checkout_page.address')}</label>
                  <input {...register("address", { required: "Address is required" })} className="w-full p-3 border border-gray-300 rounded-md" />
                  {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address.message}</p>}
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-2 font-medium">{t('checkout_page.phone')}</label>
                  <input type="tel" {...register("phone", { required: "Phone number is required" })} className="w-full p-3 border border-gray-300 rounded-md" />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="p-8 border border-gray-200 rounded-lg h-fit">
              <h2 className="pb-4 mb-6 text-2xl font-bold border-b">{t('checkout_page.your_order')}</h2>
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between text-base">
                    <span>{item.name} <span className="text-gray-500">x {item.quantity}</span></span>
                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between pt-6 mt-6 text-lg border-t">
                <span>{t('cart_page.subtotal')}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mt-2 text-lg">
                <span>{t('cart_page.shipping')}</span>
                <span>{t('cart_page.free')}</span>
              </div>
              <div className="flex justify-between pt-6 mt-6 text-2xl font-bold border-t">
                <span>{t('cart_page.total')}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button type="submit" className="w-full py-4 mt-8 font-bold tracking-widest text-white rounded-md bg-primary hover:opacity-90">
                {t('checkout_page.place_order')}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Modal ที่แปลภาษาแล้ว */}
      {isModalOpen && currentOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm p-8 text-center bg-white rounded-lg shadow-2xl">
            <h2 className="mb-4 text-2xl font-bold">{t('checkout_page.scan_to_pay')}</h2>
            <p className="mb-6 text-gray-600">{t('checkout_page.scan_instruction')}</p>
            <div className="inline-block p-2 bg-white border rounded-lg">
              {qrCodeData && <QRCodeSVG value={qrCodeData} size={220} />}
            </div>
            <p className="mt-4 text-xl font-bold">{t('checkout_page.amount_to_pay')} ${currentOrder.subtotal.toFixed(2)}</p>
            
            <div className="flex justify-center gap-4 mt-8">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 font-semibold bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                {t('checkout_page.cancel')}
              </button>
              <button 
                onClick={handleConfirmPayment}
                className="px-6 py-2 font-semibold text-white rounded-lg bg-primary hover:opacity-90"
              >
                {t('checkout_page.confirm_payment')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutPage;