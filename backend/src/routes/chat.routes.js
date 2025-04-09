

import { Router } from "express";

import { verifyJWT } from "../middleware/auth.middleware.js";

import { startChat ,continueChat } from "../controllers/chat.controller.js";


       
const chatRouter = Router(); 



chatRouter.route("/start").post(
    verifyJWT, 
    startChat);
chatRouter.route("/continue").post(
    verifyJWT, 
    continueChat);

export default chatRouter