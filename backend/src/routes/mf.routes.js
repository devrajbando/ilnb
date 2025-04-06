import { Router } from "express";
import {displayFunds,trackMF,recommendMFs} from '../controllers/mf.controller.js'
import {verifyJWT} from '../middleware/auth.middleware.js'
const mfRouter=Router()

mfRouter.route('/mfDisplay').get(displayFunds)
mfRouter.route('/track').post(trackMF)
mfRouter.route('/recommend').get(verifyJWT,recommendMFs)
export default mfRouter