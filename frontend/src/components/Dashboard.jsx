import React, { useState } from 'react';

const mockData = {
  Equities: [
    { name: 'TCS', quantity: 10, platform: 'Kite', value: 35000 },
    { name: 'Infosys', quantity: 5, platform: 'Angel One', value: 8000 },
    { name: 'Reliance', quantity: 15, platform: 'Groww', value: 42000 }
  ],
  'Mutual Funds': [
    { name: 'Axis Bluechip Fund', units: 20, platform: 'Groww', value: 50000 },
    { name: 'ICICI Prudential Equity', units: 12, platform: 'Angel One', value: 30000 }
  ]
};

function Dashboard() {
  const [selected, setSelected] = useState('Equities');

  const renderEquities = () =>
    mockData.Equities.map((stock, idx) => (
      <div key={idx} className="bg-gray-800 p-4 rounded-lg shadow mb-4">
        <div className="text-white text-lg font-semibold">{stock.name}</div>
        <div className="text-gray-300 text-sm">Quantity: {stock.quantity}</div>
        <div className="text-gray-400 text-sm">Platform: {stock.platform}</div>
        <div className="text-green-400 text-sm font-bold">₹{stock.value.toLocaleString()}</div>
      </div>
    ));

  const renderMutualFunds = () =>
    mockData['Mutual Funds'].map((mf, idx) => (
      <div key={idx} className="bg-gray-800 p-4 rounded-lg shadow mb-4">
        <div className="text-white text-lg font-semibold">{mf.name}</div>
        <div className="text-gray-300 text-sm">Units: {mf.units}</div>
        <div className="text-gray-400 text-sm">Platform: {mf.platform}</div>
        <div className="text-green-400 text-sm font-bold">₹{mf.value.toLocaleString()}</div>
      </div>
    ));

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="basis-1/4 p-6 bg-gray-800 border-r border-gray-700">
        <h2 className="text-xl font-bold mb-4">Portfolio</h2>
        <ul className="space-y-4">
          {['Equities', 'Mutual Funds'].map((item) => (
            <li key={item}>
              <button
                className={`w-full text-left px-4 py-2 rounded-md ${
                  selected === item ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
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
        {selected === 'Equities' ? renderEquities() : renderMutualFunds()}
      </div>
    </div>
  );
}

export default Dashboard;
