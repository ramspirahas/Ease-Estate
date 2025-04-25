import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">EASE REAL ESTATE</h3>
            <p className="text-gray-400 mt-1">Your trusted real estate partner</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white transition">
              <span className="sr-only">Facebook</span>
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition">
              <span className="sr-only">Twitter</span>
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition">
              <span className="sr-only">Instagram</span>
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" className="text-gray-300 hover:text-white transition">
              <span className="sr-only">LinkedIn</span>
              <i className="fab fa-linkedin text-xl"></i>
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Ease Real Estate. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;