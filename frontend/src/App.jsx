import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Compare from './components/Compare';
import Chatbot from './components/Chatbot';
import Signup from './components/SignUp';
import Login from './components/Login';
import Logout from './components/Logout';
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
      
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          
          
          {/* <ProtectedRoute><Chatbot/></ProtectedRoute> */}
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />        
          <Route path="/compare" element={<ProtectedRoute><Compare /><Chatbot/></ProtectedRoute>} />
        <Route path="/equities" element={<ProtectedRoute><Equities /><Chatbot/></ProtectedRoute>} />
        <Route path="/track" element={<ProtectedRoute><Track /><Chatbot/></ProtectedRoute>} />
        <Route path="/logout" element={<ProtectedRoute><Logout /><Chatbot/></ProtectedRoute>} />
        <Route path="/mutualfunds" element={<ProtectedRoute><MutualFunds /><Chatbot/></ProtectedRoute>} /> 
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /><Chatbot/></ProtectedRoute>} /> 
      
       
         

        </Routes>
        <Footer/>
        
      </Router>
    </div>
      </AuthProvider>

         
          
         
          
         
    </>
  )
}

export default App
