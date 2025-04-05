import React from 'react'
import {ChevronDown} from 'lucide-react'
function Compare() {
    const tableData = [
        { parameter: "Parameter", company1: "value", company2: "value" },
        { parameter: "Parameter", company1: "value", company2: "value" },
        { parameter: "Parameter", company1: "value", company2: "value" },
        { parameter: "Parameter", company1: "value", company2: "value" },
        { parameter: "Parameter", company1: "value", company2: "value" },
        { parameter: "Parameter", company1: "value", company2: "value" },
        { parameter: "Parameter", company1: "value", company2: "value" },
        { parameter: "Parameter", company1: "value", company2: "value" },
        
      ];

  return (
    <>
    <div className="w-2/3 mx-auto overflow-x-auto">
      <div className="min-w-full rounded-xl">
        {/* Table Header */}
        <div className="flex font-bold text-3xl border-gray-600 pb-2 mb-2 text-white text-head">
          <div className="flex-1 px-4 py-2">Parameter</div>
          <div className="flex-1 flex px-4 py-2">Company 1 <ChevronDown/></div>
          <div className="flex-1 px-4 py-2 flex">Company 2 <ChevronDown/></div>
        </div>
        
        {/* Table Body */}
        <div className="w-full text-gray-400">
          {tableData.map((row, index) => (
            <div 
              key={index} 
              className="flex border-b border-gray-200 last:border-b-0"
            >
              <div className="flex-1 px-4 py-3">{row.parameter}</div>
              <div className="flex-1 px-4 py-3">{row.company1}</div>
              <div className="flex-1 px-4 py-3">{row.company2}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default Compare