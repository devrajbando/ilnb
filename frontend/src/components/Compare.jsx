import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

function Compare() {
  const companies = ["Company A", "Company B", "Company C"];
  const [company1, setCompany1] = useState("Company A");
  const [company2, setCompany2] = useState("Company B");

  const tableData = [
    { parameter: "Revenue", company1: "$1M", company2: "$1.2M" },
    { parameter: "Net Profit", company1: "$200K", company2: "$250K" },
    { parameter: "Market Cap", company1: "$10M", company2: "$12M" },
    { parameter: "P/E Ratio", company1: "15", company2: "18" },
    { parameter: "Dividend Yield", company1: "2.5%", company2: "2.0%" },
    { parameter: "EPS", company1: "$3.00", company2: "$3.50" },
    { parameter: "Debt/Equity", company1: "0.5", company2: "0.3" },
    { parameter: "ROE", company1: "12%", company2: "15%" },
  ];

  return (
    <div className="min-h-screen bg-gray-950 py-10 px-4 text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }} 
        className="w-full max-w-4xl mx-auto space-y-10"
      >
        {/* Dropdown Selectors */}
        <div className="flex justify-center items-center gap-4">
          <select 
            value={company1} 
            onChange={(e) => setCompany1(e.target.value)}
            className="bg-gray-800 text-white text-lg px-6 py-3 rounded-xl shadow-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            {companies.map((comp, i) => (
              <option key={i} value={comp}>{comp}</option>
            ))}
          </select>
          <span className="text-cyan-400 font-bold text-xl">vs</span>
          <select 
            value={company2} 
            onChange={(e) => setCompany2(e.target.value)}
            className="bg-gray-800 text-white text-lg px-6 py-3 rounded-xl shadow-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            {companies.map((comp, i) => (
              <option key={i} value={comp}>{comp}</option>
            ))}
          </select>
        </div>

        {/* Glowy Table */}
        <div className="rounded-2xl border border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.7)] hover:shadow-[0_0_25px_rgba(34,211,238,1)] transition-all duration-300 backdrop-blur">
          <div className="bg-gray-900 rounded-2xl p-6">
            <div className="flex font-bold text-xl border-b border-gray-700 pb-4 mb-4 text-cyan-300">
              <div className="flex-1 px-4">Parameter</div>
              <div className="flex-1 px-4">{company1}</div>
              <div className="flex-1 px-4">{company2}</div>
            </div>

            {tableData.map((row, index) => (
              <div 
                key={index} 
                className="flex text-gray-300 border-b border-gray-700 py-3 last:border-b-0 hover:bg-gray-800 transition-colors"
              >
                <div className="flex-1 px-4">{row.parameter}</div>
                <div className="flex-1 px-4">{row.company1}</div>
                <div className="flex-1 px-4">{row.company2}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-gray-900 text-gray-200 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
        >
          <h2 className="text-2xl font-semibold text-cyan-300 mb-3">Comparison Summary</h2>
          <p className="text-gray-400">
            Based on the financial metrics, <span className="text-white font-semibold">{company2}</span> appears to outperform <span className="text-white font-semibold">{company1}</span> in areas such as ROE, Net Profit, and Market Cap. However, <span className="text-white font-semibold">{company1}</span> has a stronger dividend yield and lower debt ratio, indicating a more conservative financial posture. This comparison provides a well-rounded view of each company's strengths.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Compare;
