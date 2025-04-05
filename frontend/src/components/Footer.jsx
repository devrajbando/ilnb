import React from 'react'
import logo from '../assets/logo.png'; // Adjust the path as necessary
function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                 <img src={logo} alt="Logo" className="w-36" />
                                
              </div>
              <p className="text-gray-400">Empowering investors to make smarter decisions with powerful portfolio tools.</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Track</a></li>
                <li><a href="#" className="hover:text-white">Compare</a></li>
                <li><a href="#" className="hover:text-white">Equities</a></li>
                <li><a href="#" className="hover:text-white">Mutual Funds</a></li>
                <li><a href="#" className="hover:text-white">Dashboard</a></li>
              </ul>
            </div>
            
            
            
            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 INLB Financial Services. All rights reserved.</p>
            
          </div>
        </div>
      </footer>
  )
}

export default Footer