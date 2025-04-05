import React, { useState } from 'react';
import logo from '../assets/logo.png'; // Adjust the path as necessary
import { LayoutDashboard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('/');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'track', label: 'Track' },
    { id: 'compare', label: 'Compare' },
    { id: 'trade', label: 'Trade' },
    { id: 'equities', label: 'Equities' },
    { id: 'mutualfunds', label: 'Mutual Funds' },
  ];

  const navigate = useNavigate();

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    navigate(`/${tabId}`);
  };

  return (
    <nav className="font-inter w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center py-4 px-2" onClick={() => handleTabClick('')}>
          <img src={logo} alt="Logo" className="w-36" />
        </div>

        {/* Primary Navigation */}
        <div className="hidden md:flex items-center space-x-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`py-4 px-3 font-medium transition duration-300 ${
                activeTab === item.id
                  ? 'text-green-500 border-b-2 border-green-500'
                  : 'text-gray-700 hover:text-green-500'
              }`}
              onClick={() => handleTabClick(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button
            className={`py-4 px-3 font-medium transition duration-300 ${
              activeTab === 'dashboard'
                ? 'text-green-500 border-b-2 border-green-500'
                : 'text-gray-700 hover:text-green-500'
            }`}
            onClick={() => handleTabClick('dashboard')}
          >
            <LayoutDashboard />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            className="mobile-menu-button p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="mobile-menu">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`block py-2 px-4 ${
                activeTab === item.id
                  ? 'bg-green-500 text-white'
                  : 'text-gray-700 hover:bg-green-50 hover:text-green-500'
              }`}
              onClick={() => {
                handleTabClick(item.id);
                setIsMobileMenuOpen(false); // Auto close on click
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;