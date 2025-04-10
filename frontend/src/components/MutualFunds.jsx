import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { Binoculars, GitCompareArrows } from 'lucide-react';
import { motion } from 'framer-motion';

function MutualFunds() {
  const [funds, setFunds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const apiUrl = import.meta.env.VITE_BACKEND_URL
              const res = await fetch(`${apiUrl}/api/mf/mfDisplay`)
        const data = await res.json();
        setFunds(data);
      } catch (err) {
        console.error('Error fetching mutual funds:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFunds();
    return () => setFunds([]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10 text-white">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-center">
        <SearchBar 
          type="mf"
            placeholder="Search funds or stocks..." 
            // onResultSelect={handleSelectFund}
            
            debounceTime={400}
          />
        </div>

        {loading ? (
          <div className="text-center text-cyan-400 text-lg">Loading mutual funds...</div>
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
                  <th className="px-4 py-3">Scheme Name</th>
                  <th className="px-4 py-3">Fund House</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Last NAV</th>
                  <th className="px-4 py-3">Annualized Return</th>
                  <th className="px-4 py-3">Sharpe Ratio</th>
                  <th className="px-4 py-3">Volatility</th>
                  <th className="px-4 py-3">Max Drawdown</th>
                  <th className="px-4 py-3">Drop Since ATH</th>
                  <th className="px-4 py-3">ISIN</th>
                  <th className="px-4 py-3"></th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {funds.map((fund, index) => (
                  <tr key={fund._id || index} className="hover:bg-gray-800 transition">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3 font-medium">{fund.Scheme_Name}</td>
                    <td className="px-4 py-3">{fund.Fund_House}</td>
                    <td className="px-4 py-3">{fund.Category}</td>
                    <td className="px-4 py-3">₹{fund.Last_Close?.toFixed(2)}</td>
                    <td className="px-4 py-3">{(fund.Annualized_Return * 100).toFixed(2)}%</td>
                    <td className="px-4 py-3">{fund.Sharpe_Ratio?.toFixed(3)}</td>
                    <td className="px-4 py-3">{fund.Volatility?.toFixed(3)}</td>
                    <td className="px-4 py-3">{(fund.Maximum_Drawdown * 100).toFixed(2)}%</td>
                    <td className="px-4 py-3">{(fund.Drop_Since_All_Time_High * 100).toFixed(2)}%</td>
                    <td className="px-4 py-3">{fund.ISIN}</td>
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

export default MutualFunds;