import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'

import { Theme } from "@radix-ui/themes";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Compare from './components/Compare';
import Chatbot from './components/Chatbot';
import Chatbutton from './components/Chatbutton';
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
  
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [prePrompt, setPrePrompt] = useState('');

  const openChat = (prompt = '') => {
    setPrePrompt(prompt);
    setIsChatbotOpen(true);
  };

  const closeChat = () => {
    console.log('closeChat called');
    setPrePrompt('');
    setIsChatbotOpen(false);
  }
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
          <Route path="/compare" element={<ProtectedRoute><Compare openChat={openChat}/>

          {isChatbotOpen && <Chatbot prePrompt={prePrompt} onClose={closeChat}/>}
          <Chatbutton isOpen={isChatbotOpen} openChat={openChat} closeChat={closeChat} />
          </ProtectedRoute>} />
        <Route path="/equities" element={<ProtectedRoute><Equities openChat={openChat}/>
        {isChatbotOpen && <Chatbot prePrompt={prePrompt}  onClose={closeChat}/>}
        <Chatbutton isOpen={isChatbotOpen} openChat={openChat} closeChat={closeChat} />
        </ProtectedRoute>} />
        <Route path="/track" element={<ProtectedRoute><Track openChat={openChat}/>
        {isChatbotOpen && <Chatbot prePrompt={prePrompt} onClose={closeChat}/>}
        <Chatbutton isOpen={isChatbotOpen} openChat={openChat} closeChat={closeChat} />
        </ProtectedRoute>} />
        <Route path="/logout" element={<ProtectedRoute><Logout />
        </ProtectedRoute>} />
        <Route path="/mutualfunds" element={<ProtectedRoute><MutualFunds openChat={openChat}/>
        {isChatbotOpen && <Chatbot prePrompt={prePrompt} onClose={closeChat} />}
        <Chatbutton isOpen={isChatbotOpen} openChat={openChat} closeChat={closeChat} />
        </ProtectedRoute>} /> 
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard openChat={openChat}/>
        {isChatbotOpen && <Chatbot prePrompt={prePrompt} onClose={closeChat}/>}
        <Chatbutton isOpen={isChatbotOpen} openChat={openChat} closeChat={closeChat} />
        </ProtectedRoute>} /> 
      
       
         

        </Routes>
        <Footer/>
        
      </Router>
    </div>
      </AuthProvider>

         
          
         
          
         
    </>
  )
}

export default App
