import { Router } from "express";
import {displayStocks,trackStock,recommendStocks,searchStocks} from '../controllers/stocks.controller.js'
import {verifyJWT} from '../middleware/auth.middleware.js'
const stockRouter=Router()

stockRouter.route('/stockDisplay').get(displayStocks)
stockRouter.route('/track').post(trackStock)
stockRouter.route('/recommend').get(verifyJWT,recommendStocks)
stockRouter.route('/search').post(searchStocks)

export default stockRouter