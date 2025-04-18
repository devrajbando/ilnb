import React from 'react'
import { useState } from 'react'
import { Brain, X } from 'lucide-react'
import Chatbot from './Chatbot'
function Chatbutton({isOpen, openChat, closeChat}) {
   
  return (
    <>
    <button
    onClick={!isOpen ? ()=>openChat('') : closeChat}
    className={`fixed bottom-6 right-6 flex items-center bg-green-900 justify-center w-14 h-14 rounded-full shadow-lg text-white focus:outline-none hover:scale-110 transition`}
    >
    {!isOpen ? <Brain className="h-6 w-6" /> : <X className="h-6 w-6" />}
  </button>
      </>
  )
}

export default Chatbutton