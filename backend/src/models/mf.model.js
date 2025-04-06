import mongoose from 'mongoose';

const mutualFundSchema = new mongoose.Schema({
  Sharpe_Ratio: Number,
  Annualized_Return: Number,
  Return_in_Last_Month: Number,
  Return_in_Last_Six_Months: Number,
  Return_in_Last_Year: Number,
  Volatility: Number,
  Maximum_Drawdown: Number,
  All_Time_High: Number,
  Drop_Since_All_Time_High: Number,
  Last_Close: Number,
  Scheme_Name: String,
  ISIN: String,
  Category: String,
  Fund_House: String,
  Normalized_Sharpe_Ratio: Number,
  Normalized_Annualized_Return: Number,
  Normalized_Return_in_Last_Month: Number,
  Normalized_Return_in_Last_Six_Months: Number,
  Normalized_Return_in_Last_Year: Number,
  Normalized_Volatility: Number,
  Normalized_Maximum_Drawdown: Number,
  Normalized_Drop_Since_All_Time_High: Number,
  Composite_Score_Risky: Number
});

const MutualFund = mongoose.models.MutualFund || mongoose.model('MutualFund', mutualFundSchema);

export default MutualFund;