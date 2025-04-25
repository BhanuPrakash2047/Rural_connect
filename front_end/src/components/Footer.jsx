import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-8 mt-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-green-400">Our Company</h2>
          <p className="mt-2 text-gray-400">
            Transforming India by addressing local issues with a strong community-driven approach.
          </p>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-2xl font-bold text-green-400">Services</h2>
          <ul className="mt-2 space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-green-300">Service 1</a></li>
            <li><a href="#" className="text-gray-400 hover:text-green-300">Service 2</a></li>
            <li><a href="#" className="text-gray-400 hover:text-green-300">Service 3</a></li>
            <li><a href="#" className="text-gray-400 hover:text-green-300">Service 4</a></li>
          </ul>
        </div>

        {/* Support & Socials */}
        <div>
          <h2 className="text-2xl font-bold text-green-400">Support</h2>
          <ul className="mt-2 space-y-2">
            <li><a href="/customer-service" className="text-gray-400 hover:text-green-300">Customer Service</a></li>
            <li><a href="/feedback" className="text-gray-400 hover:text-green-300">Feedback</a></li>
          </ul>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4">
            <a href="#" className="text-gray-400 hover:text-blue-500"><FaFacebook size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-sky-400"><FaTwitter size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-pink-500"><FaInstagram size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-blue-600"><FaLinkedin size={24} /></a>
          </div>
        </div>
      </div>

      <div className="text-center mt-8 text-gray-500">
        © 2024 Our Company | All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;
