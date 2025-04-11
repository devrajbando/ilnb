

import { Router } from "express";

import { verifyJWT } from "../middleware/auth.middleware.js";

import { startChat ,continueChat, summarizeComparison } from "../controllers/chat.controller.js";


       
const chatRouter = Router(); 



chatRouter.route("/start").post(
    verifyJWT, 
    startChat);
chatRouter.route("/continue").post(
    verifyJWT, 
    continueChat);
chatRouter.route("/summary").post(
    verifyJWT, 
    summarizeComparison);

export default chatRouter