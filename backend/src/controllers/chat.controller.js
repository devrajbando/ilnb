import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from '../utils/ApiError.js'

import bcrypt from 'bcrypt'
import { ApiResponse } from "../utils/ApiResponse.js";

import { GoogleGenerativeAI } from "@google/generative-ai"; // Ensure you have the correct package installed

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY); // Ideally use process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI('AIzaSyAljRC428A-Epl9Vjkgz098gZhkw-C0pG0'); // Ideally use process.env.GEMINI_API_KEY

const PREDEFINED_TOPICS = {
    "Risk": "You're a financial advisor. Explain what the Sharpe Ratio is, how it helps assess investment risk, and when it's useful. Briefly describe what different ranges of Sharpe Ratios mean, using simple examples. Keep it short and easy to understand for someone with no financial background — 2 to 3 sentences, no jargon.",
    "Stability": "You're a financial advisor. Explain what Maximum Drawdown means, how it shows investment stability, and when it matters. Give a simple example to show how different drawdown values affect investment decisions. Use plain language for someone without financial knowledge — max 2 to 3 sentences, no jargon.",
    "One year Return": "You're a financial advisor. Explain what Annualized Return means, how it works, and why it's important for investors. Include a basic example of how different return values might impact someone's investment. Keep it very simple, short (2 to 3 sentences), and avoid financial jargon.",
    "": `You are a financial advisor. In the following conversation, you will be asked to explain financial concepts in a simple and easy-to-understand manner. Your explanations should be concise, using plain language and avoiding jargon. Please keep your responses short, ideally 2 to 3 sentences. Answer all of the user's inputs in the context of finance, stocks mutual funds and investments. If the user asks for a definition, provide a clear and simple explanation. If the user asks for an example, give a straightforward example that illustrates the concept. If the user asks for a comparison, highlight the key differences or similarities between the two concepts in a simple way. If the user asks for advice, provide general guidance without specific recommendations. If the user asks for a summary, give a brief overview of the main points.`,
}
const chatSessions = {};

function generateChatId() {
  
  const randomPart = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
  return randomPart
}
let chatId;
 const startChat=asyncHandler(async(req,res)=>{
    console.log(genAI)
    const input =req.body.inputValue;
    // const userId=req.user._id 
    
    const userId = "user_123456"; 
    const newChatId = generateChatId();
    chatId=newChatId
    console.log("hi") 
    // Function to generate a chat ID for a specific user  
     
    

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const chat = model.startChat({ history: [] });

    const result = await chat.sendMessage(PREDEFINED_TOPICS[input]);

    chatSessions[chatId] = chat;

  if(input==="")res.json({response:`Hello ${req.user.name}! How can I assist you today?`})

    res.json({
      response: result.response.text(),
    });

}) 

 const continueChat=asyncHandler(async(req,res)=>{
  const input =req.body.inputValue;
  const chatId = req.body.chatId;
  console.log(chatId)
  // try {
  //   const response = await fetch('http://127.0.0.1:5020/main/continue', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       input,chatId
  //     }), 
  //   });
  //     if (!response.ok) {
  //         throw new Error('Error with Flask API response');
  //     }
  //     const data = await response.json();
  //     res.json(data);
  // } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ 
  //       status: "error", 
  //       message: "Error connecting to Flask API",
  //       error: error.message
  //   });
  // }
  const chat = chatSessions[chatId];
  const result = await chat.sendMessage(userInput);
  res.json({ response: result.response.text() });
})

export {startChat,continueChat}