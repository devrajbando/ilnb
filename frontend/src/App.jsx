import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Track from './components/Track';
import Compare from './components/Compare';
import Trade from './components/Trade';
function App() {
  

  return (
    <>
  
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/track" element={<Track />}></Route>
          <Route path="/compare" element={<Compare />}></Route>
          <Route path="/trade" element={<Trade />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
