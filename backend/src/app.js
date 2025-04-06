import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRouter from './routes/user.routes.js';
<<<<<<< HEAD
import stockRouter from './routes/stock.routes.js';
=======
import { createServer } from 'node:http';


>>>>>>> be09e09025943fcd6a8dfd293b27291902a1452c



const app=express()
app.use(cors(
  {
    origin:['http://localhost:5173','http://localhost:5174'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true,
}))


<<<<<<< HEAD

=======
>>>>>>> be09e09025943fcd6a8dfd293b27291902a1452c
app.use(express.json({
    limit:'16kb'
}))



app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static("public"))
app.use(cookieParser())


app.use('/api/users', userRouter);
<<<<<<< HEAD
app.use('/api/stock', stockRouter);
  

=======
>>>>>>> be09e09025943fcd6a8dfd293b27291902a1452c


export {app}