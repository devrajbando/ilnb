import { Router } from "express";
import {displayStocks} from '../controllers/stocks.controller.js'

const stockRouter=Router()

stockRouter.route('/stockDisplay').get(displayStocks)

export default stockRouter