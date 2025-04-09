import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { Binoculars, GitCompareArrows } from 'lucide-react';
import { motion } from 'framer-motion';

function Equities() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/stock/stockDisplay');
        const data = await res.json();
        setStocks(data);
      } catch (err) {
        console.error('Error fetching stocks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
    return () => setStocks([]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Search */}
        <div className="flex justify-center">
        <SearchBar 
          type="stock"
            placeholder="Search funds or stocks..." 
            // onResultSelect={handleSelectFund}
            
            debounceTime={400}
          />
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center text-cyan-400 text-lg">Loading stocks...</div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-x-auto rounded-2xl border border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] backdrop-blur"
          >
            <table className="min-w-full table-auto text-sm">
              <thead className="bg-gray-900 text-cyan-300 text-left">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Last Close</th>
                  <th className="px-4 py-3">Annualized Return</th>
                  <th className="px-4 py-3">Sharpe Ratio</th>
                  <th className="px-4 py-3">Volatility</th>
                  <th className="px-4 py-3">Max Drawdown</th>
                  <th className="px-4 py-3">Composite Score</th>
                  <th className="px-4 py-3">Listing</th>
                  <th className="px-4 py-3"></th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {stocks.map((stock, index) => (
                  <tr key={stock._id || index} className="hover:bg-gray-800 transition">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium">{stock.Stock}</td>
                    <td className="px-4 py-3">{stock.NAME_OF_COMPANY}</td>
                    <td className="px-4 py-3">₹{stock.Last_Close?.toFixed(2)}</td>
                    <td className="px-4 py-3">{(stock.Annualized_Return * 100).toFixed(2)}%</td>
                    <td className="px-4 py-3">{stock.Sharpe_Ratio?.toFixed(3)}</td>
                    <td className="px-4 py-3">{stock.Volatility?.toFixed(3)}</td>
                    <td className="px-4 py-3">{(stock.Maximum_Drawdown * 100).toFixed(2)}%</td>
                    <td className="px-4 py-3">{stock.Composite_Score_Risky?.toFixed(3)}</td>
                    <td className="px-4 py-3">{stock.DATE_OF_LISTING}</td>
                    <td className="px-4 py-3">
                      <button className="text-green-400 hover:text-green-300 flex items-center gap-1">
                        View <Binoculars size={16} />
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
                        Compare <GitCompareArrows size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </div>
  );
}


export default Equities;

