import React, { useState } from 'react';
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
  const navigate = useNavigate();
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    navigate(tabId);
  };
  
  return (
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
    </nav>
  );
};

export default Navbar;