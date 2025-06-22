import Navbar from './Navbar';
import Footer from './Footer';
import QuickViewModal from '../product/QuickViewModal'; 
import { Toaster } from 'sonner'; 

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Toaster position="bottom-right" richColors />
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />       
      <QuickViewModal />
    </div>
  );
};
export default Layout;