import { useState, useEffect, useRef } from 'react';
import { SendHorizontal, Brain, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = ({ prePrompt, onClose }) => {
  const [messages, setMessages] = useState([{ id: 1, text: '...', sender: 'bot' }]);
  const [chatId, setChatId] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom whenever messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Message container animation variants
  const messageVariants = {
    initial: { 
      opacity: 0,
      y: 20,
      scale: 0.9
    },
    animate: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
        duration: 0.4
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.2
      }
    }
  };

  // Text animation for typing effect
  const textVariants = {
    initial: { 
      opacity: 0,
      height: 0
    },
    animate: { 
      opacity: 1,
      height: "auto",
      transition: {
        opacity: { duration: 0.3 },
        height: { duration: 0.4 }
      }
    }
  };

  // Chat container animation
  const chatContainerVariants = {
    initial: { opacity: 0, scale: 0.8, y: 30 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 30,
      transition: { duration: 0.3 } 
    }
  };

  useEffect(() => {
    const startChat = async () => {
      try {
        const apiUrl = import.meta.env.VITE_BACKEND_URL
        const response = await fetch(`${apiUrl}/api/chat/start`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            inputValue: prePrompt,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setMessages([{ id: 1, text: data.response, sender: 'bot' }]);
          setChatId(data.chat_id);
        } else {
          console.error('Error:', data.message || 'Failed to fetch bot response.');
        }
      } catch (error) {
        console.error(error);
      }
    };
    startChat();
  }, [prePrompt]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') return;

    const newUserMessage = { id: messages.length + 1, text: inputValue, sender: 'user' };
    setMessages([...messages, newUserMessage]);

    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URL
      const response = await fetch(`${apiUrl}/api/chat/continue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          inputValue,
          chatId,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        const newBotMessage = { id: messages.length + 2, text: data.response, sender: 'bot' };
        setMessages((prevMessages) => [...prevMessages, newBotMessage]);
      } else {
        console.error('Error:', data.message || 'Failed to fetch bot response.');
      }
    } catch (error) {
      console.error(error);
    }

    setInputValue('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        className="flex flex-col w-96 h-[550px] bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-green-600"
        variants={chatContainerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="bg-gradient-to-r from-green-700 to-green-600 text-white p-4 flex justify-between items-center rounded-t-2xl shadow-md">
          <h3 className="font-bold text-lg flex items-center">
            <Brain className="mr-2 text-green-300" />
            AI Assistant
          </h3>
          <button 
            onClick={onClose} 
            className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 rounded-full p-1 transition-all duration-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto bg-gray-800 text-sm space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                variants={messageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <motion.div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-lg ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-br from-green-600 to-green-700 text-white rounded-br-none'
                      : 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-100 rounded-bl-none border-l-2 border-green-500'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <motion.div
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    className="overflow-hidden"
                  >
                    {message.sender === 'bot' ? (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: 1,
                          transition: {
                            duration: 0.5,
                            ease: "easeInOut"
                          }
                        }}
                      >
                        {message.text}
                      </motion.p>
                    ) : (
                      <p>{message.text}</p>
                    )}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </AnimatePresence>
        </div>

        <form onSubmit={handleSendMessage} className="border-t border-green-700 p-3 bg-gray-900">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 border border-gray-700 text-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 transition-all duration-200"
            />
            <motion.button
              type="submit"
              className="flex items-center bg-green-600 text-white font-medium rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              whileHover={{ scale: 1.05, backgroundColor: '#059669' }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              disabled={inputValue.trim() === ''}
            >
              Send
              <SendHorizontal className="ml-2 h-5 w-5" />
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Chatbot;