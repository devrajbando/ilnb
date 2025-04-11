import { asyncHandler } from "../utils/AsyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import MutualFund from '../models/mf.model.js'
import connectDB from "../db/index.js"
import bcrypt from 'bcrypt'
import {User} from '../models/user.model.js'
import { ApiResponse } from "../utils/ApiResponse.js"; 

export const displayFunds= async (req, res) => {

      try {
        const mfs = await MutualFund.find().limit(50); // Limit or paginate
        res.status(200).json(mfs);
      } catch (err) {
        res.status(500).json({ error: 'Failed to fetch funds' });
      }
  }

export const trackMF= asyncHandler(async(req,res)=>{
    const stock=req.body.title
    const stockinfo = await MutualFund.findOne({ Scheme_Name: stock })
    .select('Sharpe_Ratio Maximum_Drawdown Annualized_Return Scheme_Name Fund_House Return_in_Last_Year Volatility Composite_Score_Risky')

  console.log(stockinfo)
    
    res.json({
      success: true,
      stockinfo,
    });


})

export const recommendMFs=asyncHandler(async(req,res)=>{
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

        const topFunds = await MutualFund.find()
        .sort({ Return_in_Last_Year: -1 }) // Sort descending
        .limit(5)
        .select('Fund_House Scheme_Name');
      
      const stableFunds = await MutualFund.find({
          Volatility: { $lt: 0.4 }  // Volatility less than 0.4
        })
        .sort({ 
          Sharpe_Ratio: -1  // Sort by Sharpe Ratio descending
        })
        .limit(5)  // Limit to top 5 results
        .select('Fund_House Scheme_Name');
      
        let volatilityThreshold = 0.4; // Default threshold
        // Set volatility threshold based on score
    if (score > 25) {
      volatilityThreshold = 0.5;
    } else if (score <= 15) {
      volatilityThreshold = 0.3; // More conservative for low scores
    } else {
      volatilityThreshold = 0.4; // Default case (15 < score ≤ 25)
    }

    const bestFunds = await MutualFund.find({
      Volatility: { $lt: volatilityThreshold }
    })
    .sort({ 
      Composite_Score_Risky: -1 // Highest risk-adjusted score first
    })
    .limit(5)
    .select('Fund_House Scheme_Name');

    const stocks=[...topFunds,...stableFunds,...bestFunds]
  
      res.json({
        success: true,
        stocks,
      });
        
        
    
    
        
      } catch (error) {
        console.log(error)
      }
    
})

export const searchMFs=asyncHandler(async(req,res)=>{
    const query = req.body.query.toLowerCase();
    try {
        const funds = await MutualFund.find({
          Scheme_Name: { $regex: query, $options: 'i' } // Case-insensitive search
        }).limit(10); // Limit to top 5 results
    
        res.json(funds);
      } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ message: 'Error fetching search results' });
      }
})