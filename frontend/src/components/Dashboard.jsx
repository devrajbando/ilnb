import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import {Binoculars} from 'lucide-react';
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [selected, setSelected] = useState('Equities');
  const { user } = useAuthContext();
  const [stocks, setStocks] = useState([]);
  const [mFunds, setMFunds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError('');

      try {
        // Fetch stocks
        const stockResponse = await fetch('http://localhost:8000/api/users/stocks', {
          method: 'POST',
          credentials: 'include', // Include cookies in the request
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: user._id }),
        });

        const stockData = await stockResponse.json();
        if (stockData.statusCode === 200) {
          setStocks(stockData.data.stocks);
        } else {
          setError(stockData.message || 'Failed to fetch stocks.');
        }
      } catch (error) {
        setError('Failed to fetch stocks. Please try again.');
      }

      try {
        // Fetch mutual funds
        const mfResponse = await fetch('http://localhost:8000/api/users/mutualfunds', {
          method: 'POST',
          credentials: 'include', // Include cookies in the request
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: user._id }),
        });

        const mfData = await mfResponse.json();
        
        if (mfData.statusCode === 200) {
          setMFunds(mfData.data.mutualFunds);
        } else {
          setError(mfData.message || 'Failed to fetch mutual funds.');
        }
      } catch (error) {
        setError('Failed to fetch mutual funds. Please try again.');
      }

      setLoading(false);
    }

    fetchData();
  }, [user._id]);
  const goToEq = (stock) => {
    navigate('/track', { state: { title : stock, type : "stock" } });
  }
  const goToMF = (scheme) => {
    navigate('/track', { state: { title: scheme, type: "mf" } });
  }
  const renderEquities = () =>{
    return (
      <div className="min-h-screen bg-gray-950 px-4 py-10 text-white">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Table */}
          {loading ? (
            <div className="text-center text-cyan-400 text-lg">Loading stocks...</div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] backdrop-blur">
              <table className="min-w-full table-auto text-sm">
                <thead className="bg-gray-900 text-cyan-300 text-left">
                  <tr>
                    <th className="px-4 py-3"></th>
                    <th className="px-4 py-3">Stock</th>
                    <th className="px-4 py-3">Company</th>
                    <th className="px-4 py-3">Series</th>
                    <th className="px-4 py-3">ISIN</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Avg Price</th>
                    <th className="px-4 py-3">Last Close</th>
                    <th className="px-4 py-3">Current Value</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Profit %</th>
                    <th className="px-4 py-3">1M Return</th>
                    <th className="px-4 py-3">6M Return</th>
                    <th className="px-4 py-3">1Y Return</th>
                    <th className="px-4 py-3">Volatility</th>
                    <th className="px-4 py-3">Risk Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {stocks.map((stock, index) => (
                    <tr key={index} className="hover:bg-gray-800 transition">
                      <td className="px-4 py-3 font-medium"><button onClick={()=>goToEq(stock.Stock)} className='btn btn-success btn-soft flex'>View <Binoculars/></button></td>
                      <td className="px-4 py-3 font-medium">{stock.Stock}</td>
                      <td className="px-4 py-3">{stock.NAME_OF_COMPANY}</td>
                      <td className="px-4 py-3">{stock.SERIES}</td>
                      <td className="px-4 py-3">{stock.ISIN_NUMBER}</td>
                      <td className="px-4 py-3">{stock.Quantity}</td>
                      <td className="px-4 py-3">₹{stock.Average_Buying_Price?.toFixed(2)}</td>
                      <td className="px-4 py-3">₹{stock.Last_Close?.toFixed(2)}</td>
                      <td className="px-4 py-3">₹{stock.Current_Portfolio_Value?.toFixed(2)}</td>
                      <td className={`px-4 py-3 ${stock.Profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ₹{stock.Profit?.toFixed(2)}
                      </td>
                      <td className={`px-4 py-3 ${stock['Profit_%'] >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {stock['Profit_%']?.toFixed(2)}%
                      </td>
                      <td className={`px-4 py-3 ${stock.Return_in_Last_Month >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {stock.Return_in_Last_Month?.toFixed(2)}%
                      </td>
                      <td className={`px-4 py-3 ${stock.Return_in_Last_Six_Months >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {stock.Return_in_Last_Six_Months?.toFixed(2)}%
                      </td>
                      <td className={`px-4 py-3 ${stock.Return_in_Last_Year >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {stock.Return_in_Last_Year?.toFixed(2)}%
                      </td>
                      <td className="px-4 py-3">{stock.Volatility?.toFixed(3)}</td>
                      <td className="px-4 py-3">{stock.Composite_Score_Risky?.toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }


  const renderMutualFunds = () =>
  {
    return (
      <div className="min-h-screen bg-gray-950 px-4 py-10 text-white">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Table */}
          {loading ? (
            <div className="text-center text-cyan-400 text-lg">Loading mutual funds...</div>
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] backdrop-blur">
              <table className="min-w-full table-auto text-sm">
                <thead className="bg-gray-900 text-cyan-300 text-left">
                  <tr>
                    <th className="px-4 py-3"></th>
                    <th className="px-4 py-3">Scheme Name</th>
                    <th className="px-4 py-3">Fund House</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">ISIN</th>
                    <th className="px-4 py-3">Quantity</th>
                    <th className="px-4 py-3">Avg Price</th>
                    <th className="px-4 py-3">Last Close</th>
                    <th className="px-4 py-3">Current Value</th>
                    <th className="px-4 py-3">Profit</th>
                    <th className="px-4 py-3">Profit %</th>
                    <th className="px-4 py-3">1M Return</th>
                    <th className="px-4 py-3">6M Return</th>
                    <th className="px-4 py-3">1Y Return</th>
                    <th className="px-4 py-3">Volatility</th>
                    <th className="px-4 py-3">Risk Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {mFunds.map((fund, index) => (
                    <tr key={index} className="hover:bg-gray-800 transition">
                      <td className="px-4 py-3 font-medium"><button onClick={()=>goToMF(fund.Scheme_Name)} className='btn btn-success btn-soft flex'>View <Binoculars/></button></td>
                      <td className="px-4 py-3 font-medium">{fund.Scheme_Name}</td>
                      <td className="px-4 py-3">{fund.Fund_House}</td>
                      <td className="px-4 py-3">{fund.Category}</td>
                      <td className="px-4 py-3">{fund.ISIN}</td>
                      <td className="px-4 py-3">{fund.Quantity}</td>
                      <td className="px-4 py-3">₹{fund.Average_Buying_Price?.toFixed(2)}</td>
                      <td className="px-4 py-3">₹{fund.Last_Close?.toFixed(2)}</td>
                      <td className="px-4 py-3">₹{fund.Current_Portfolio_Value?.toFixed(2)}</td>
                      <td className={`px-4 py-3 ${fund.Profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ₹{fund.Profit?.toFixed(2)}
                      </td>
                      <td className={`px-4 py-3 ${fund['Profit_%'] >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {fund['Profit_%']?.toFixed(2)}%
                      </td>
                      <td className={`px-4 py-3 ${fund.Return_in_Last_Month >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {fund.Return_in_Last_Month?.toFixed(2)}%
                      </td>
                      <td className={`px-4 py-3 ${fund.Return_in_Last_Six_Months >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {fund.Return_in_Last_Six_Months?.toFixed(2)}%
                      </td>
                      <td className={`px-4 py-3 ${fund.Return_in_Last_Year >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {fund.Return_in_Last_Year?.toFixed(2)}%
                      </td>
                      <td className="px-4 py-3">{fund.Volatility?.toFixed(3)}</td>
                      <td className="px-4 py-3">{fund.Composite_Score_Risky?.toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
   
      
      

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="basis-1/4 p-6 bg-gray-800 border-r border-gray-700">
        <h2 className="text-xl font-bold mb-4">Portfolio</h2>
        <ul className="space-y-4">
          {['Equities', 'Mutual Funds'].map((item) => (
            <li key={item}>
              <button
                className={`w-full text-left px-4 py-2 rounded-md btn  ${
                  selected === item ? 'btn-success text-white' : ' text-gray-300 hover:bg-gray-600'
                }`}
                onClick={() => setSelected(item)}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Display */}
      <div className="basis-3/4 p-8">
        <h1 className="text-3xl font-bold mb-6">Your {selected}</h1>
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : selected === 'Equities' ? (
          renderEquities()
        ) : (
          renderMutualFunds()
        )}
      </div>
    </div>
  );
}

export default Dashboard;