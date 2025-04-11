import React from "react";

const formatPercent = (value) => `${(value * 100).toFixed(2)}%`;

const HighlightedMetric = ({ label, value1, value2, isHigherBetter = true }) => {
  const isStock1Better = isHigherBetter ? value1 > value2 : value1 < value2;

  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-center sm:items-start sm:gap-4 py-4 shadow-sm rounded-md">
      <div className="w-full sm:w-1/3 text-sm font-medium text-gray-200">
        {label}
      </div>
  
      <div className="w-full sm:w-1/3 text-sm text-center sm:text-left">
        <span className={`${isStock1Better ? "text-green-600" : "text-red-700"}  font-semibold`}>
          {formatPercent(value1)}
        </span>
      </div>
  
      <div className="w-full sm:w-1/3 text-sm text-center sm:text-right">
        <span className={`${!isStock1Better ? "text-green-600" : "text-red-700"}  font-semibold`}>
          {formatPercent(value2)}
        </span>
      </div>
    </div>
  );
  
};

const StockComparisonCard = ({ stock1, stock2 ,type }) => {
    console.log(stock1)
  return (
    <div className="p-6 bg-gray-800 text-white shadow-lg rounded-xl max-w-3xl mx-auto w-full">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-6 text-center">📊 Stock Comparison</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-green-600 font-semibold mb-4">
        <div className="hidden sm:block" />
        <div className="text-center">
  {type === "stock" ? stock1.NAME_OF_COMPANY : stock1.Scheme_Name}
</div>
<div className="text-center">
  {type === "stock" ? stock2.NAME_OF_COMPANY : stock2.Scheme_Name}
</div>
      </div>

      <HighlightedMetric label="Sharpe Ratio" value1={stock1.Sharpe_Ratio} value2={stock2.Sharpe_Ratio} />
      <HighlightedMetric label="Annualized Return" value1={stock1.Annualized_Return} value2={stock2.Annualized_Return} />
      <HighlightedMetric label="1-Year Return" value1={stock1.Return_in_Last_Year} value2={stock2.Return_in_Last_Year} />
      <HighlightedMetric label="Volatility" value1={stock1.Volatility} value2={stock2.Volatility} isHigherBetter={false} />
      <HighlightedMetric label="Max Drawdown" value1={stock1.Maximum_Drawdown} value2={stock2.Maximum_Drawdown} isHigherBetter={false} />
      

      <div className="mt-6 border-t pt-4 text-base sm:text-lg font-semibold text-center">
        Composite Score:
        <span className={`ml-2 ${stock1.Composite_Score_Risky > stock2.Composite_Score_Risky ? "text-green-600" : ""}`}>
          {stock1.Composite_Score_Risky.toFixed(3)}
        </span>{" "}
        vs{" "}
        <span className={`${stock2.Composite_Score_Risky > stock1.Composite_Score_Risky ? "text-green-600" : ""}`}>
          {stock2.Composite_Score_Risky.toFixed(3)}
        </span>
      </div>
    </div>
  );
};

export default StockComparisonCard;
