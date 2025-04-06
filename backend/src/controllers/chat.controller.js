import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'
import { ApiResponse } from "../utils/ApiResponse.js";

// function generateChatId(userId) {
//   // Combine user ID with a random UUID
//   return `${userId}_chat_${uuidv4()}`;
// }

function generateChatId() {
  
  const randomPart = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return randomPart
}

 const startChat=asyncHandler(async(req,res)=>{
    
    const input =req.body.inputValue;
    // const userId=req.user._id 
    
    const userId = "user_123456";
    const newChatId = generateChatId();
    console.log("hi") 
    // Function to generate a chat ID for a specific user  

    try {
        const response = await fetch('http://127.0.0.1:5020/main/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            input,newChatId
          }), 
        });
          if (!response.ok) {
              throw new Error('Error with Flask API response');
          }
          const data = await response.json();
          console.log(data)
          res.json(data);
      } catch (error) {
          console.error(error);
          res.status(500).json({ 
            status: "error",
            message: "Error connecting to Flask API",
            error: error.message
        });
      }

}) 

 const continueChat=asyncHandler(async(req,res)=>{
  const input =req.body.inputValue;
  const chatId = req.body.chatId;
  try {
    const response = await fetch('http://127.0.0.1:5020/main/continue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input,chatId
      }), 
    });
      if (!response.ok) {
          throw new Error('Error with Flask API response');
      }
      const data = await response.json();
      res.json(data);
  } catch (error) {
      console.error(error);
      res.status(500).json({ 
        status: "error", 
        message: "Error connecting to Flask API",
        error: error.message
    });
  }
})

export {startChat,continueChat}