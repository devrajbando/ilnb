import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/SignUp'
import Compare from './components/Compare'
import Track from './components/Track'
import Equities from './components/Equities'
import MutualFunds from './components/MutualFunds'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  

  return (
    <>
    <AuthProvider>
      <Router>
          <Navbar/>
          
        <Routes>
         
          <Route path="/" element={<Home />} />
          
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
         
          
          <Route path="/compare" element={<ProtectedRoute><Compare /></ProtectedRoute>} />
        <Route path="/equities" element={<ProtectedRoute><Equities /></ProtectedRoute>} />
        <Route path="/track" element={<ProtectedRoute><Track /></ProtectedRoute>} />
        <Route path="/mutualfunds" element={<ProtectedRoute><MutualFunds /></ProtectedRoute>} />
        </Routes>
        
      <Footer/>
   
      </Router>
    </AuthProvider>
    </>
  )
}

export default App
