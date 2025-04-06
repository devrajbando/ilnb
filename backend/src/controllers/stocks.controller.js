import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import Stock from '../models/stocks.model.js'
import connectDB from "../db/index.js"
import bcrypt from 'bcrypt'
import { ApiResponse } from "../utils/ApiResponse.js";

export const displayStocks= async (req, res) => {

      try {
        const stocks = await Stock.find().limit(50);
        console.log(stocks) // Limit or paginate
        res.status(200).json(stocks);
      } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Failed to fetch stocks' });
      }
  }