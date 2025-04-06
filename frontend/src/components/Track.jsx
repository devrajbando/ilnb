import React, { useState, useEffect } from 'react';
import Candlestick from './Candlestick';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const parameters = [
  { name: 'Sharpe Ratio', value: 'value', info: 'Info about Sharpe Ratio' },
  { name: 'Maximum Drawdown', value: 'value', info: 'Info about Maximum Drawdown' },
  { name: 'Annualized Return', value: 'value', info: 'Info about Annualized Return' },
];

function Track() {
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [selected, setSelected] = useState('buy');
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stockDetails, setStockDetails] = useState("");
  const location = useLocation();
  console.log(location.state)
  const { title, type } = location.state || { scheme: 'Default', type: 'stock' };
  // console.log(scheme)
  useEffect(() => {
    async function fetchTrackData() {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`http://localhost:8000/api/${type}/track`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        });

        const data = await response.json();
        console.log(data)
        console.log("12345")
        if (data === 200) {
          setStockDetails(data.data);
        } else {
          console.log(data.message || 'Failed to fetch stock details.');
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTrackData();
  }, [type]);

  useEffect(() => {
    async function fetchRecommendations() {
      
      try {
        const response = await fetch(`http://localhost:8000/api/${type}/recommend`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data)
        if (data.success === true) {
          setRecs(data.stocks);
          console.log(recs)
        } else {
          setError(data.message || 'Failed to fetch recommendations.');
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchRecommendations();
  }, [type]);

  const renderRecommendations = (startIndex, endIndex, title) => {
    const recommendations = recs.slice(startIndex, endIndex);
    if (!recommendations.length) {
      return <p className="text-gray-400">No recommendations available.</p>;
    }
  
    return (
      <div className="bg-gray-900 rounded-xl p-4 shadow-lg">
  <h1 className="text-white text-xl font-semibold mb-3">{title}</h1>
  <ul className="space-y-4">
    {recommendations.map((item, index) => (
      <li key={index} className="flex items-center space-x-4">
        <img
          src={type === "stock" 
            ? "https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?auto=format&fit=crop&w=927&q=80" 
            : "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=927&q=80"}
          alt={type === "stock" ? "Stock" : "Mutual Fund"}
          className="h-20 w-20 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h4 className="text-lg font-medium text-gray-200">
            {type === "stock" ? item.Stock : item.Scheme_Name}
          </h4>
          <p className="text-sm text-gray-400">
            {type === "stock" ? item.NAME_OF_COMPANY : item.Fund_House}
          </p>
          <div className="mt-2 space-x-2">
            <button className="px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md text-sm text-white">
              View
            </button>
            <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-md text-sm text-white">
              Compare
            </button>
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-950 text-white">
      {/* Chart Section */}
      <div className="md:basis-2/3 p-4">
        <motion.div
          className="border border-cyan-400 rounded-xl p-6 shadow-[0_0_20px_rgba(34,211,238,0.7)] hover:shadow-[0_0_25px_rgba(34,211,238,1)] transition-all duration-300 backdrop-blur"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-4 text-cyan-300">{title}</h1>
          {loading ? (
            <p className="text-gray-400">Loading stock details...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <Candlestick />
          )}
        </motion.div>
      </div>

      {/* Control Panel */}
      <div className="md:basis-1/3 p-4 space-y-6 overflow-y-auto">
        <div className="bg-gray-900 rounded-xl p-4 shadow-lg">
          <div className="flex justify-around mb-4">
            <button
              className={`tab ${selected === 'buy' ? 'tab-active text-green-400 border-b-2 border-green-500' : 'text-gray-400'}`}
              onClick={() => setSelected('buy')}
            >
              Market Buy
            </button>
            <button
              className={`tab ${selected === 'sell' ? 'tab-active text-red-400 border-b-2 border-red-500' : 'text-gray-400'}`}
              onClick={() => setSelected('sell')}
            >
              Market Sell
            </button>
          </div>

          {selected === 'buy' && (
            <div className="flex items-center space-x-2">
              <input type="number" placeholder="Shares to Buy" className="input input-sm input-success flex-1" />
              <button className="btn btn-success btn-sm">Buy</button>
            </div>
          )}

          {selected === 'sell' && (
            <div className="flex items-center space-x-2">
              <input type="number" placeholder="Shares to Sell" className="input input-sm input-success flex-1" />
              <button className="btn btn-error btn-sm">Sell</button>
            </div>
          )}
        </div>

        {/* Stock Information */}
        <div className="bg-gray-900 rounded-xl p-6 space-y-4 shadow-lg">
          <h2 className="text-xl font-bold text-cyan-300">Stock Information</h2>
          {parameters.map((param, idx) => (
            <div
              key={idx}
              className="bg-gray-800 rounded-lg px-4 py-3 flex justify-between items-center hover:bg-gray-700 transition"
            >
              <div className="flex items-center gap-2">
                <span className="font-medium">{param.name}</span>
                <button
                  onClick={() => setSelectedInfo(param.info)}
                  className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs hover:bg-blue-600"
                  title="More info"
                >
                  i
                </button>
              </div>
              <span className="text-sm text-gray-300">{param.value}</span>
            </div>
          ))}

          {selectedInfo && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-gray-700 rounded-xl border border-cyan-400 shadow-lg p-6 w-80">
                <h3 className="text-lg font-bold mb-2">Info</h3>
                <p className="text-sm">{selectedInfo}</p>
                <button
                  onClick={() => setSelectedInfo(null)}
                  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Recommendations */}
        {renderRecommendations(0, 5, 'Stable Stocks')}
        {renderRecommendations(5, 10, 'Highest Returns')}
        {renderRecommendations(10, 15, 'Recommended for You')}
      </div>
    </div>
  );
}

export default Track;