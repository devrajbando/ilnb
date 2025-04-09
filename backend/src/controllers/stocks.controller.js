import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import Stock from '../models/stocks.model.js'
import {User} from '../models/user.model.js'
import connectDB from "../db/index.js"
import bcrypt from 'bcrypt'
import { ApiResponse } from "../utils/ApiResponse.js";

export const displayStocks= async (req, res) => {

      try {
        const stocks = await Stock.find().limit(50);
        // Limit or paginate
        res.status(200).json(stocks);
      } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Failed to fetch stocks' });
      }
  }

  export const trackStock= asyncHandler(async(req,res)=>{
    const stock=req.body.title
    
    
    
    const stockinfo = await Stock.findOne({ Stock: stock })
    .select('Sharpe_Ratio Maximum_Drawdown Annualized_Return')
    
    
    return res.json({
      success: true,
      stockinfo
    });


  })

  export const recommendStocks=asyncHandler(async(req,res)=>{
    try {
      const user = await User.findById(req.user._id)
      .select('score')
      

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const score = user.score;


      // Fetch top 10 stocks
      const topStocks = await Stock.find()
        .sort({ Return_in_Last_Year: -1 }) // Sort descending
        .limit(5)
        .select('Stock NAME_OF_COMPANY');
      
      const stableStocks = await Stock.find({
          Volatility: { $lt: 0.4 }  // Volatility less than 0.4
        })
        .sort({ 
          Sharpe_Ratio: -1  // Sort by Sharpe Ratio descending
        })
        .limit(5)  // Limit to top 5 results
        .select('Stock NAME_OF_COMPANY');
      
        let volatilityThreshold = 0.4; // Default threshold
        // Set volatility threshold based on score
    if (score > 25) {
      volatilityThreshold = 0.5;
    } else if (score <= 15) {
      volatilityThreshold = 0.3; // More conservative for low scores
    } else {
      volatilityThreshold = 0.4; // Default case (15 < score ≤ 25)
    }

    const bestStocks = await Stock.find({
      Volatility: { $lt: volatilityThreshold }
    })
    .sort({ 
      Composite_Score_Risky: -1 // Highest risk-adjusted score first
    })
    .limit(5)
    .select('Stock NAME_OF_COMPANY');
  
    const stocks=[...topStocks,...stableStocks,...bestStocks]
      res.json({
        success: true,
        stocks,
      });
      
    } catch (error) {
      console.log(error)
    }
  })

  export const searchStocks=asyncHandler(async(req,res)=>{
    const query = req.body.query.toLowerCase();
    
    try {
      const stocks = await Stock.find({
        $or: [
          { Stock: { $regex: query, $options: 'i' } },
          { NAME_OF_COMPANY: { $regex: query, $options: 'i' } }
        ]
      }).limit(10); // Limit to 10 results
 
      if (stocks.length === 0) {
        return res.status(404).json({ message: 'No stocks found' });
      }
      res.json(stocks);
    } catch (error) {
      console.error('Error searching stocks:', error);
      res.status(500).json({ message: 'Error searching stocks' });
    }


  })