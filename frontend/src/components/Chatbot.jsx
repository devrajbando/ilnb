import { useState, useEffect } from 'react';
import { SendHorizontal, Brain, X } from 'lucide-react';
import { motion } from 'framer-motion';

const Chatbot = ({ prePrompt, onClose }) => {
  const [messages, setMessages] = useState([{ id: 1, text: '...', sender: 'bot' }]);
  const [chatId, setChatId] = useState(null);
  const [inputValue, setInputValue] = useState('');
  
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
        className="flex flex-col w-[360px] h-[500px] bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-green-700"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-green-700 text-white p-4 flex justify-between items-center rounded-t-2xl shadow-md">
          <h3 className="font-semibold text-lg flex">
            AI ChatBot <Brain className="mx-2" />
          </h3>
          <button onClick={onClose} className="text-white hover:text-gray-300 focus:outline-none">
            <X className="h-5 w-5" />
          </button>
        </div>

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
      </motion.div>
    </div>
  );
};

export default Chatbot;