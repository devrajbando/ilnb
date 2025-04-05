import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user.routes.js';
import { createServer } from 'node:http';
const app=express()

app.use(cors(
  {
    origin:'http://localhost:5173',
    // origin:['https://synthcode.vercel.app','http://localhost:5173'],
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


const server = createServer(app);

server.listen(3000, () => {
  console.log('socket server running at http://localhost:3002');
});


export {app}