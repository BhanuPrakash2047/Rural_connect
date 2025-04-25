import { Outlet } from "react-router-dom";
import Header from "../components/ui/issues/Header.jsx";
 // Import your header
import Footer from "../components/Footer.jsx"; // Import your footer

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
