import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { createServer } from 'node:http';
import userRouter from './routes/user.routes.js';
import stockRouter from './routes/stock.routes.js';



const app=express()

app.use(cors(
  {
    origin:'http://localhost:5173',
    
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
app.use('/api/stock', stockRouter);
  



export {app}