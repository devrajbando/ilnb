import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import {allStockData} from '../data/fullStockData.js'
import {allMFdata} from '../data/fullMFdata.js'
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

  if(input==="") return res.json({response:`Hello ${req.user.name}! How can I assist you today?`,
  chat_id:chatId
  })

    return res.json({
      response: result.response.text(),
      chat_id:chatId
    });
 
}) 

 const continueChat=asyncHandler(async(req,res)=>{
  const input =req.body.inputValue;
  console.log(req.body)
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
  const result = await chat.sendMessage(input);
  res.json({ response: result.response.text() });
})

const summarizeComparison=asyncHandler(async(req,res)=>{
  // const {company1,company2} = req.body;
  console.log(req.body)
  const company1=req.body.Company_one
  const company2=req.body.Company_two
  console.log("mustardddddd") 
  console.log(company1,company2) 
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
  const chat = model.startChat({ history: [] });
  const comparePrompt = `You are a financial advisor. The following is the data of two stocks or mutual funds. First: ${JSON.stringify(company1)}. Second: ${JSON.stringify(company2)}. Compare the two and summarize the key differences and similarities in a simple and easy-to-understand manner. Your summary should be concise, using plain language and avoiding jargon. Instead of using the official financial terms, use plain, everyday language to explain to the user. Please keep your response short, ideally 3 to 4 sentences. Give further financial advice, but keep it diploamtic, not absolute and your recommendations can be divided into differetnt type of users.`;
 
  const result = await chat.sendMessage(comparePrompt);
  res.json({
    response: result.response.text(),
  });
})

export {startChat,continueChat,summarizeComparison}