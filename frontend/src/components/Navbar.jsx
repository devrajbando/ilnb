import React, { useState } from 'react';

import logo from '../assets/logo.png';
import { LayoutDashboard, Menu, X ,LogOut} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const navItems = [
  { id: 'track', label: 'Track' },
  { id: 'compare', label: 'Compare' },
  { id: 'equities', label: 'Equities' },
  { id: 'mutualfunds', label: 'Mutual Funds' },
];

const Navbar = () => {
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);

    navigate(`/${tabId}`);
    setIsMobileMenuOpen(false);


  };
  
  return (

    <nav className="w-full bg-gray-900 text-white shadow-md z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => handleTabClick('')}>
          <img src={logo} alt="Logo" className="w-36" />
        </div>

        {/* Desktop Navigation */}
        <div className={`${user?"hidden md:flex":"hidden"}  items-center space-x-6`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`transition duration-300 pb-1 border-b-2 font-medium text-sm md:text-base ${
                activeTab === item.id
                  ? 'border-cyan-400 text-cyan-400'
                  : 'border-transparent text-gray-300 hover:text-cyan-400 hover:border-cyan-400'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleTabClick('dashboard')}
            className={`p-1 transition duration-300 border-b-2 ${
              activeTab === 'dashboard'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-gray-300 hover:text-cyan-400 hover:border-cyan-400'
            }`}
          >
            <LayoutDashboard size={20} />
          </button>
          <button
            onClick={() => handleTabClick('logout')}
            className={`p-1 transition duration-300 border-b-2 ${
              activeTab === 'logout'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-gray-300 hover:text-cyan-400 hover:border-cyan-400'
            }`}
          >
            <LogOut size={20} />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-cyan-400">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className={`${user?"":"hidden"} md:hidden bg-gray-800 px-4 pb-4 space-y-2`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`block w-full text-left py-2 px-2 rounded-md font-medium transition duration-200 ${
                activeTab === item.id
                  ? 'bg-cyan-500 text-white'
                  : 'text-gray-300 hover:bg-cyan-500 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => handleTabClick('dashboard')}
            className={`w-full flex items-center gap-2 py-2 px-2 rounded-md font-medium transition duration-200 ${
              activeTab === 'dashboard'
                ? 'bg-cyan-500 text-white'
                : 'text-gray-300 hover:bg-cyan-500 hover:text-white'
            }`}
          >
            <LayoutDashboard size={18} /> Dashboard
          </button>
          <button
            onClick={() => handleTabClick('logout')}
            className={`w-full flex items-center gap-2 py-2 px-2 rounded-md font-medium transition duration-200 ${
              activeTab === 'logout'
                ? 'bg-cyan-500 text-white'
                : 'text-gray-300 hover:bg-cyan-500 hover:text-white'
            }`}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
