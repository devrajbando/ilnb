import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Compare from './components/Compare';
import Chatbot from './components/Chatbot';
import Signup from './components/SignUp';
import Login from './components/Login';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import Track from './components/Track';
import ProtectedRoute from './components/ProtectedRoute';
import Equities from './components/Equities';
import MutualFunds from './components/MutualFunds';
import Dashboard from './components/Dashboard';

function App() {
  

  return (
    <>


    <AuthProvider>
    <div className='font-inter'>
      <Router>
      
      <Chatbot/>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          
          
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />

         
          
          <Route path="/compare" element={<ProtectedRoute><Compare /></ProtectedRoute>} />
        <Route path="/equities" element={<ProtectedRoute><Equities /></ProtectedRoute>} />
        <Route path="/track" element={<ProtectedRoute><Track /></ProtectedRoute>} />
        <Route path="/mutualfunds" element={<ProtectedRoute><MutualFunds /></ProtectedRoute>} /> 
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> 
      
          {/* <Route path="/compare" element={<Compare />} />
        <Route path="/equities" element={<Equities />} />
        <Route path="/track" element={<Track />} />
        <Route path="/mutualfunds" element={<MutualFunds />} />  */}
       
         

        </Routes>
        <Footer/>
        
      </Router>
    </div>
      </AuthProvider>

         
          
         
          
         
    </>
  )
}

export default App
