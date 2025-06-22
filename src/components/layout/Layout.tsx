// src/components/layout/Layout.tsx
import Navbar from './Navbar';
import Footer from './Footer';
import QuickViewModal from '../product/QuickViewModal'; 

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer /> {/* เรียกใช้ Footer */}
      <QuickViewModal />
    </div>
  );
};
export default Layout;