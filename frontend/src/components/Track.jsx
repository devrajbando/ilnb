import React from 'react';
import Candlestick from './Candlestick';
import { useState } from 'react';
import { motion } from 'framer-motion';

const parameters = [
  { name: 'Parameter 1', value: 'value', info: 'Info about Parameter 1' },
  { name: 'Parameter 2', value: 'value', info: 'Info about Parameter 2' },
  { name: 'Parameter 3', value: 'value', info: 'Info about Parameter 3' },
];

function Track() {
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [selected, setSelected] = useState('buy');

  return (
    <div className='flex flex-col md:flex-row h-screen bg-gray-950 text-white'>
      {/* Chart Section */}
      <div className='md:basis-2/3 p-4'>
        <motion.div
          className='border border-cyan-400 rounded-xl p-6 shadow-[0_0_20px_rgba(34,211,238,0.7)] hover:shadow-[0_0_25px_rgba(34,211,238,1)] transition-all duration-300 backdrop-blur'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className='text-4xl font-bold mb-4 text-cyan-300'>Company Name</h1>
          <Candlestick />
        </motion.div>
      </div>

      {/* Control Panel */}
      <div className='md:basis-1/3 p-4 space-y-6 overflow-y-auto'>
        <div className='bg-gray-900 rounded-xl p-4 shadow-lg'>
          <div className='flex justify-around mb-4'>
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
            <div className='flex items-center space-x-2'>
              <input type='number' placeholder='Shares to Buy' className='input input-sm input-success flex-1' />
              <button className='btn btn-success btn-sm'>Buy</button>
            </div>
          )}

          {selected === 'sell' && (
            <div className='flex items-center space-x-2'>
              <input type='number' placeholder='Shares to Sell' className='input input-sm input-success flex-1' />
              <button className='btn btn-error btn-sm'>Sell</button>
            </div>
          )}
        </div>

        {/* Stock Information */}
        <div className='bg-gray-900 rounded-xl p-6 space-y-4 shadow-lg'>
          <h2 className='text-xl font-bold text-cyan-300'>Stock Information</h2>

          {parameters.map((param, idx) => (
            <div
              key={idx}
              className='bg-gray-800 rounded-lg px-4 py-3 flex justify-between items-center hover:bg-gray-700 transition'
            >
              <div className='flex items-center gap-2'>
                <span className='font-medium'>{param.name}</span>
                <button
                  onClick={() => setSelectedInfo(param.info)}
                  className='w-5 h-5 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs hover:bg-blue-600'
                  title='More info'
                >
                  i
                </button>
              </div>
              <span className='text-sm text-gray-300'>{param.value}</span>
            </div>
          ))}

          {selectedInfo && (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
              <div
                className='bg-white text-black rounded-xl shadow-xl p-6 w-80'
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className='text-lg font-bold mb-2'>Info</h3>
                <p className='text-sm'>{selectedInfo}</p>
                <button
                  onClick={() => setSelectedInfo(null)}
                  className='mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded'
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Recommendations */}
        {[1, 2, 3].map((cat) => (
          <div
            key={cat}
            className='bg-gray-900 rounded-xl p-4 shadow-lg'
          >
            <h1 className='text-white text-xl font-semibold mb-3'>Recommended Category {cat}</h1>
            <ul className='space-y-4'>
              {[1, 2, 3].map((stock) => (
                <li key={stock} className='flex items-center space-x-4'>
                  <img
                    src='https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?auto=format&fit=crop&w=927&q=80'
                    alt='Stock'
                    className='h-20 w-20 rounded-lg object-cover'
                  />
                  <div className='flex-1'>
                    <h4 className='text-lg font-medium text-gray-200'>Stock {stock}</h4>
                    <div className='mt-1 space-x-2'>
                      <button className='btn btn-success btn-sm'>View</button>
                      <button className='btn btn-primary btn-sm'>Compare</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Track;
