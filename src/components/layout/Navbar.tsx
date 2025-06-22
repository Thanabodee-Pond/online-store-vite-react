import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCart } from '../../context/CartContext';
import { useFilters } from '../../context/FilterContext';
import { useWishlist } from '../../context/WishlistContext';
import { FiShoppingCart, FiHeart, FiUser, FiSearch, FiX, FiMenu } from 'react-icons/fi';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { items: cartItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { searchTerm, setSearchTerm } = useFilters();

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isAccountActive, setIsAccountActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchActive(false);
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  
  const changeLanguage = (lng: 'en' | 'th') => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <nav className="container flex items-center justify-between px-4 py-4 mx-auto">
          
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(true)} className="flex items-center text-gray-600 hover:text-primary">
                <FiMenu size={24} />
            </button> 
          </div>

          <Link to="/" className="mx-auto text-2xl font-bold text-dark md:mx-0">MyStore</Link>
          
          <div className="items-center hidden gap-6 md:flex">
            <Link to="/" className="text-gray-600 hover:text-primary">{t('navbar.home')}</Link>
            <Link to="/products" className="text-gray-600 hover:text-primary">{t('navbar.products')}</Link>
            <Link to="/about" className="text-gray-600 hover:text-primary">{t('navbar.about_us')}</Link>
          </div>
          
          <div className="flex items-center gap-4">
            
            <div className="relative">
                {/* --- แก้ไข: เพิ่ม flex items-center --- */}
                <button onClick={() => setIsSearchActive(prev => !prev)} className="flex items-center text-gray-600 hover:text-primary">
                    <FiSearch size={24} />
                </button>
                {isSearchActive && (
                    <div 
                        className="absolute right-0 z-50 p-4 mt-2 bg-white rounded-lg shadow-xl w-72"
                        onMouseLeave={() => setIsSearchActive(false)}
                    >
                        <form onSubmit={handleSearchSubmit}>
                            <div className="relative">
                                <input 
                                    type="text"
                                    placeholder={t('navbar.search_placeholder') || "Search..."}
                                    className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    autoFocus
                                />
                                <button type="submit" className="absolute text-xl text-gray-500 -translate-y-1/2 right-3 top-1/2">
                                    <FiSearch />
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
            
            <div className="relative hidden md:block">
              {/* --- แก้ไข: เพิ่ม flex items-center --- */}
              <button onClick={() => setIsAccountActive(prev => !prev)} className="flex items-center text-gray-600 hover:text-primary">
                <FiUser size={24} />
              </button>
              {isAccountActive && (
                <div 
                  className="absolute right-0 z-50 w-48 py-2 mt-2 bg-white rounded-md shadow-xl"
                  onMouseLeave={() => setIsAccountActive(false)}
                >
                  <Link to="/login-register" onClick={() => setIsAccountActive(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('navbar.login')}</Link>
                  <Link to="/login-register" onClick={() => setIsAccountActive(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('navbar.register')}</Link>
                  <Link to="/my-account" onClick={() => setIsAccountActive(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{t('navbar.my_account')}</Link>
                </div>
              )}
            </div>

            <Link to="/wishlist" className="relative flex items-center text-gray-600 hover:text-primary">
              <FiHeart size={24} />
              {wishlistItems.length > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white rounded-full -top-2 -right-3 bg-primary">{wishlistItems.length}</span>
              )}
            </Link>

            <Link to="/cart" className="relative flex items-center text-gray-600 hover:text-primary">
              <FiShoppingCart size={24} />
              {totalCartItems > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs text-white rounded-full -top-2 -right-3 bg-primary">{totalCartItems}</span>
              )}
            </Link>

             <div className="items-center hidden gap-2 pl-4 ml-2 border-l md:flex">
              <button onClick={() => changeLanguage('th')} className={`font-semibold ${i18n.language === 'th' ? 'text-primary' : 'text-gray-500 hover:text-primary'}`}>TH</button>
              <span className="text-gray-300">|</span>
              <button onClick={() => changeLanguage('en')} className={`font-semibold ${i18n.language === 'en' ? 'text-primary' : 'text-gray-500 hover:text-primary'}`}>EN</button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-50 bg-white transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="p-8">
              <button onClick={closeMobileMenu} className="absolute text-3xl text-gray-600 top-8 right-8 hover:text-dark"><FiX /></button>
              <nav className="flex flex-col items-start gap-8 mt-16 text-2xl font-semibold">
                  <Link to="/" onClick={closeMobileMenu} className="text-gray-700 hover:text-primary">{t('navbar.home')}</Link>
                  <Link to="/products" onClick={closeMobileMenu} className="text-gray-700 hover:text-primary">{t('navbar.products')}</Link>
                  <Link to="/about" onClick={closeMobileMenu} className="text-gray-700 hover:text-primary">{t('navbar.about_us')}</Link>
                  <hr className="w-full my-4"/>
                  <Link to="/my-account" onClick={closeMobileMenu} className="text-gray-700 hover:text-primary">{t('navbar.my_account')}</Link>
                  <Link to="/login-register" onClick={closeMobileMenu} className="text-gray-700 hover:text-primary">{t('navbar.login')} / {t('navbar.register')}</Link>
                   <div className="flex items-center gap-4 pt-8">
                     <button onClick={() => {changeLanguage('th'); closeMobileMenu();}} className={`font-semibold ${i18n.language === 'th' ? 'text-primary' : 'text-gray-500'}`}>ไทย</button>
                     <span className="text-gray-300">|</span>
                     <button onClick={() => {changeLanguage('en'); closeMobileMenu();}} className={`font-semibold ${i18n.language === 'en' ? 'text-primary' : 'text-gray-500'}`}>English</button>
                   </div>
              </nav>
          </div>
      </div>
    </>
  );
};

export default Navbar;