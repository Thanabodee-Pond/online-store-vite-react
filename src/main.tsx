// src/main.tsx
import React, { Suspense } from 'react'; // 1. Import Suspense
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CartProvider } from './context/CartContext.tsx';
import { FilterProvider } from './context/FilterContext.tsx';
import { WishlistProvider } from './context/WishlistContext.tsx';
import { QuickViewProvider } from './context/QuickViewContext.tsx';

import './i18n'; // 2. Import ไฟล์ตั้งค่า i18n

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 3. ครอบ App ทั้งหมดด้วย Suspense */}
    <Suspense fallback="Loading...">
      <FilterProvider>
        <WishlistProvider>
          <QuickViewProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </QuickViewProvider>
        </WishlistProvider>
      </FilterProvider>
    </Suspense>
  </React.StrictMode>,
)