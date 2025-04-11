import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRouter from './routes/user.routes.js';
import chatRouter from './routes/chat.routes.js';

import stockRouter from './routes/stock.routes.js';
import mfRouter from './routes/mf.routes.js';

import { createServer } from 'node:http';




const app=express()
app.use(cors(
  {
    origin:['http://localhost:5173','https://investify-ilnb.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true,
}))


app.use(express.json({
    limit:'16kb'
}))



app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static("public"))
app.use(cookieParser())


app.use('/api/users', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/mf', mfRouter);
app.use('/api/stock', stockRouter);
  
export {app}