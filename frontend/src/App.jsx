import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Compare from './components/Compare';
import Trade from './components/Trade';
import Footer from './components/Footer';
import Track from './components/Track';
import Equities from './components/Equities';
import MutualFunds from './components/MutualFunds';
function App() {
  

  return (
    <>
    <div className='font-inter'>

  
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/equities" element={<Equities />}></Route>
          <Route path="/track" element={<Track />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/compare" element={<Compare />}></Route>
          <Route path="/mutualfunds" element={<MutualFunds />}></Route>
        </Routes>
        <Footer/>
      </Router>
    </div>
    </>
  )
}

export default App
