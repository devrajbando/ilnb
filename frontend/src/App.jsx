import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
// import { Provider } from "./ui/Provider";
import Compare from './components/Compare';
import Trade from './components/Trade';
import Signup from './components/SignUp';
import Login from './components/Login';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import Track from './components/Track';
import ProtectedRoute from './components/ProtectedRoute';
import Equities from './components/Equities';
import MutualFunds from './components/MutualFunds';
function App() {
  

  return (
    <>

    <AuthProvider>
    <div className='font-inter'>
      <Router>
      {/* <Provider> */}
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/equities" element={<ProtectedRoute><Equities /></ProtectedRoute>} />
          <Route path="/track" element={<ProtectedRoute><Track /></ProtectedRoute>} />
          <Route path="/compare" element={<ProtectedRoute><Compare /></ProtectedRoute>} />
          <Route path="/mutualfunds" element={<ProtectedRoute><MutualFunds /></ProtectedRoute>} />

          
        </Routes>
        <Footer/>
        {/* </Provider> */}
      </Router>
    </div>
      </AuthProvider>
    </>
  )
}

export default App
