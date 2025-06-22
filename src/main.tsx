import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CartProvider } from './context/CartContext.tsx';
import { FilterProvider } from './context/FilterContext.tsx';
import { WishlistProvider } from './context/WishlistContext.tsx';
import { QuickViewProvider } from './context/QuickViewContext.tsx';

import './i18n'; 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
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