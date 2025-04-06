import React, { useState } from 'react';
<<<<<<< HEAD
import logo from '../assets/logo.png';
import { LayoutDashboard, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const navItems = [
  { id: 'track', label: 'Track' },
  { id: 'compare', label: 'Compare' },
  { id: 'equities', label: 'Equities' },
  { id: 'mutualfunds', label: 'Mutual Funds' },
];

const Navbar = () => {
  const [activeTab, setActiveTab] = useState('/');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
=======
import logo from '../assets/logo.png'; // Adjust the path as necessary

import {LayoutDashboard} from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from '../hooks/useAuthContext';
const Navbar = () => {
  const [activeTab, setActiveTab] = useState('/');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuthContext();
  const navItems = [
    
    { id: 'track', label: 'Track' },
    { id: 'compare', label: 'Compare' },
    { id: 'equities', label: 'Equities' },
    { id: 'mutualfunds', label: 'Mutual Funds' }
  ];
>>>>>>> be09e09025943fcd6a8dfd293b27291902a1452c
  const navigate = useNavigate();
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
<<<<<<< HEAD
    navigate(`/${tabId}`);
    setIsMobileMenuOpen(false);
=======
    navigate(tabId);
>>>>>>> be09e09025943fcd6a8dfd293b27291902a1452c
  };
  
  return (
<<<<<<< HEAD
    <nav className="w-full bg-gray-900 text-white shadow-md z-50 sticky top-0">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => handleTabClick('')}>
          <img src={logo} alt="Logo" className="w-36" />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
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
        <div className="md:hidden bg-gray-800 px-4 pb-4 space-y-2">
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
        </div>
      )}
=======
    <nav className="font-inter w-full shadow-md">
            
      <div className="hidden md:flex mx-auto px-2 justify-between">
      <div className="flex items-center py-4 px-2" onClick={() => handleTabClick('')}>
                <img src={logo} alt="Logo" className="w-36" />
                
            </div>
        {/* <div className="flex justify-between mx-auto"> */}
          
            
            {/* Primary Nav */}
            <div className={`${user?"items-center space-x-3":"hidden"}`} >
               

                    
              {navItems.map(item => (
                  <button
                  key={item.id}
                  
                  className={`py-4 px-3 font-medium transition duration-300 ${
                      activeTab === item.id
                      ? 'text-green-500 border-b-2 border-green-500'
                      : 'text-gray-200 hover:text-green-500'
                    }`}
                    onClick={() => {
                        handleTabClick(item.id)
                        
                    }}
                    >
                  {item.label}
                </button>
              ))}

             
              
            </div>
              <button className={`${user?"":"hidden"} py-4 px-3 md:mb-5 md:mr-24 font-medium transition duration-300 ${
                      activeTab === 'dashboard'
                      ? 'text-green-500 border-b-2 border-green-500'
                      : 'text-gray-200 hover:text-green-500'
                    }`}
                    onClick={() => {
                        handleTabClick('dashboard')
                        
                    }}><LayoutDashboard/></button>
            </div>
          
          {/* Mobile button */}
          <div className="md:hidden flex">
          
          <div className="flex items-center py-4 px-2" onClick={() => handleTabClick('')}>
                <img src={logo} alt="Logo" className="w-36" />
                
            </div>
          <button
  className={`mobile-menu-button p-2 ${user?"":"hidden"}`}
  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
>
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="white"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
</button>
          
        
      </div>
      
      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
  <div className="mobile-menu">
    {navItems.map(item => (
      <button
        key={item.id}
        // href={`#${item.id}`}
        className={`block py-2 px-4 ${
          activeTab === item.id
            ? 'bg-green-500 text-white'
            : 'text-gray-200 hover:bg-green-50 hover:text-green-500'
        }`}
        onClick={() => {
          handleTabClick(item.id);
          setIsMobileMenuOpen(false); // optional: auto close on click
        }}
      >
        {item.label}
      </button>
    ))}
  </div>
</div>

>>>>>>> be09e09025943fcd6a8dfd293b27291902a1452c
    </nav>
  );
};

export default Navbar;
