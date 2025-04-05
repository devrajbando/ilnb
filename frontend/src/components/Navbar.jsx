import React, { useState } from 'react';
 import logo from '../assets/logo.png'; // Adjust the path as necessary
 import {LayoutDashboard} from 'lucide-react';
 import { useNavigate } from "react-router-dom";
 import { useAuthContext } from '../hooks/useAuthContext';
 const Navbar = () => {
    const { user } = useAuthContext();
   const [activeTab, setActiveTab] = useState('/');
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const navItems = [
     
     { id: 'track', label: 'Track' },
     { id: 'compare', label: 'Compare' },
     { id: 'trade', label: 'Trade' },
     { id: 'equities', label: 'Equities' },
     { id: 'mutualfunds', label: 'Mutual Funds' }
   ];
   const navigate = useNavigate();
   const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    navigate(`/${tabId}`); // Navigate to the corresponding route
   };
 
   return (
     <nav className="font-inter w-full bg-white shadow-md">
     <nav className="font-inter w-full shadow-md">
 
       <div className="max-w-6xl px-2 flex">
             <div className="flex items-center py-4 px-2">
       <div className="hidden md:flex mx-auto px-2 justify-between">
       <div className="flex items-center py-4 px-2" onClick={() => handleTabClick('')}>
                 <img src={logo} alt="Logo" className="w-36" />
                 {/* <span className="text-xl font-semibold text-gray-200 ml-2">ILNB</span> */}
                 
             </div>
         <div className="flex justify-between mx-auto">
         {/* <div className="flex justify-between mx-auto"> */}
 
             {/* Logo */}
             
             {/* Primary Nav */}
             <div className="hidden md:flex items-center space-x-3">
             <div className=" items-center space-x-3">
                
 
                     
               {navItems.map(item => (
                 <button
                   <button
                   key={item.id}
                 //   href={${item.id}}
                   
                   className={`py-4 px-3 font-medium transition duration-300 ${
                     activeTab === item.id
                       activeTab === item.id
                       ? 'text-green-500 border-b-2 border-green-500'
                       : 'text-gray-200 hover:text-green-500'
                   }`}
                   onClick={() => {
                     handleTabClick(item.id)
 
                   }}
                 >
                     }`}
                     onClick={() => {
                         handleTabClick(item.id)
                         
                     }}
                     >
                   {item.label}
                 </button>
               ))}
 
              
               
             </div>
               <button className={`py-4 px-3 md:mb-5 md:mr-24 font-medium transition duration-300 ${
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
   className="mobile-menu-button p-2"
   onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}

     />
   </svg>
 </button>
           </div>
         </div>
           
         
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