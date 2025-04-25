import { Outlet } from 'react-router-dom';
import Header from '../components/ui/schemes/Header.jsx';
import Footer from '@/components/Footer.jsx';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content - Dynamic based on route */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;