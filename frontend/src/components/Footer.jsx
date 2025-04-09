import React from 'react';
import logo from '../assets/logo.png';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 font-inter">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-10">
          {/* Brand Info */}
          <div>
            <div className="flex items-center mb-4">
              <img src={logo} alt="Logo" className="w-36" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering investors to make smarter decisions with powerful portfolio tools.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-cyan-400 transition">Track</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Compare</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Equities</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Mutual Funds</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Dashboard</a></li>
            </ul>
          </div>

          {/* Company Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-cyan-400 transition">About Us</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition">Contact</a></li>
            </ul>
          </div>

          
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 INLB Financial Services. All rights reserved.</p>
          <p className="mt-4 md:mt-0">
            Made with ❤️ by your team
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
