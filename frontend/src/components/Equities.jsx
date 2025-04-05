import React from 'react';
import SearchBar from './SearchBar';
import { Binoculars, GitCompareArrows } from 'lucide-react';
import { motion } from 'framer-motion';

function Equities() {
  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10 text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Search */}
        <div className="flex justify-center">
          <SearchBar />
        </div>

        {/* Table */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="overflow-x-auto rounded-2xl border border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] backdrop-blur"
        >
          <table className="min-w-full table-auto text-sm">
            <thead className="bg-gray-900 text-cyan-300 text-left">
              <tr>
                <th className="px-6 py-4">#</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Market Price</th>
                <th className="px-6 py-4">Close Price</th>
                <th className="px-6 py-4">Market Cap (CR)</th>
                <th className="px-6 py-4"></th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              <tr className="hover:bg-gray-800 transition">
                <td className="px-6 py-4">1</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-white">Hart Hagerty</div>
                      <div className="text-gray-400 text-xs">United States</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">Rs.1000</td>
                <td className="px-6 py-4">Rs.1000</td>
                <td className="px-6 py-4">Rs.10,000 CR</td>
                <td className="px-6 py-4">
                  <button className="text-green-400 hover:text-green-300 flex items-center gap-1 transition">
                    View <Binoculars size={18} />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition">
                    Compare <GitCompareArrows size={18} />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  );
}

export default Equities;
