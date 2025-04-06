import { useState } from 'react';
import {SendHorizontal,Brain} from 'lucide-react'
const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: '...', sender: 'bot' }
  ]);
  const [chatId, setChatId] = useState(null); // State to store the chat ID
  const [inputValue, setInputValue] = useState('');


  const prePrompts=["","","","","",""]

  const openChat = async() => {
    setIsOpen(true);
    try{
        const response = await fetch('http://localhost:8000/api/chat/start', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              inputValue:"You're a financial advisor. Explain what sharpe ratio are, how they work, and when they are ideal for investment. Make it simple and easy to understand, and explain in a maximum of two sentences. A simple layman should be able to understand your explanation. Use a friendly tone and avoid jargon.'"
              
            }),
          });
          const data = await response.json();
          console.log(data.response)
          if (response.ok) {
            // Set the bot's response as the first message
            setMessages([
              { id: 1, text: data.response, sender: 'bot' }
            ]);
            setChatId(data.chat_id); // Set the chat ID for future messages
          } else {
            console.error('Error:', data.message || 'Failed to fetch bot response.');
          }
    }catch (error) {
        if (error.response && error.response.data) {
          console.log(error.response.data.message || 'Something went wrong. Please try again.');
        } else {
          console.log(error);
        }
      }
  };
  const closeChat = () => {
    setIsOpen(false);
  };

  const handleSendMessage =async(e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user'
    };

    setMessages([...messages, newUserMessage]);
    
        try {
            const response = await fetch('http://localhost:8000/api/chat/continue', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                inputValue,chatId
                
              }),
            });
            const data = await response.json();
            console.log(data)

           if (response.ok) {
      // Add the bot's response to the chat
      const newBotMessage = {
        id: messages.length + 2, // Increment ID for the bot's message
        text: data.response,
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, newBotMessage]);
    } else {
      console.error('Error:', data.message || 'Failed to fetch bot response.');
    }
            
            
           
        } catch (error) {
          if (error.response && error.response.data) {
            setError(error.response.data.message || 'Something went wrong. Please try again.');
          } else {
            setError('Something went wrong. Please try again.');
          }
        }
        
        setInputValue('');
    
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="flex flex-col w-[360px] h-[500px] bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-green-700">
          {/* Chat header */}
          <div className="bg-green-700 text-white p-4 flex justify-between items-center rounded-t-2xl shadow-md">
            <h3 className="font-semibold text-lg flex">AI ChatBot  <Brain className='mx-2'/></h3>
            <button 
              onClick={closeChat}
              className="text-white hover:text-gray-300 focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
  
          {/* Messages container */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-800 text-sm space-y-3">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[75%] px-4 py-2 rounded-xl shadow-sm ${
                    message.sender === 'user' 
                      ? 'bg-green-700 text-white rounded-br-none' 
                      : 'bg-gray-700 text-gray-100 rounded-bl-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
  
          {/* Input area */}
          <form onSubmit={handleSendMessage} className="border-t border-green-700 p-3 bg-gray-900">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-400"
              />
              <button
                type="submit"
                className="flex items-center bg-green-700 text-white font-medium rounded-lg px-4 py-2 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Send
                <SendHorizontal className="ml-2 h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      )}
  
     
      {!isOpen && 
      <button
        onClick={openChat}
        className={`mt-4 flex items-center bg-green-900 justify-center w-14 h-14 rounded-full shadow-lg        
        text-white focus:outline-none hover:bg-green-600 transition`}
      >
        <Brain className="h-6 w-6" />
      </button>}
    </div>
  );
  
};

export default Chatbot;