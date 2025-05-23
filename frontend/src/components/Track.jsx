import React, { useState, useEffect } from 'react';
import Candlestick from './Candlestick';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {Popover,Button} from '@radix-ui/themes'
import {Brain} from 'lucide-react'
import SearchBar from './SearchBar';

function Track({openChat}) {
  const navigate = useNavigate();
  const [selectedInfo, setSelectedInfo] = useState(null);
  const [selected, setSelected] = useState('buy');
  const [recs, setRecs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prePrompt, setPrePrompt] = useState('');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [error, setError] = useState('');
  const [stockDetails, setStockDetails] = useState("");
  const location = useLocation();
  

  const { title, type } = location.state || { title: 'Default', type: 'stock' };
  
  const getSharpeEmoji = (v) =>
    v > 1.5 ? "📈" : v > 0.5 ? "⚠️" : "❌";

  const getSharpeColor = (v) =>
    v > 1.5 ? "text-green-600" : v > 0.5 ? "text-yellow-500" : "text-red-500";

  const getDrawdownColor = (v) =>
    v > -10 ? "text-green-600" : v > -30 ? "text-yellow-500" : "text-red-600";

  const getReturnEmoji = (v) =>
    v > 20 ? "🚀" : v > 10 ? "💰" : "📊";

  const getReturnColor = (v) =>
    v > 20 ? "text-green-600" : v > 10 ? "text-yellow-500" : "text-muted-foreground";

  useEffect(() => {
      if(title=='Default')return


    async function fetchTrackData() {
      
      setLoading(true);
      setError('');
      try {
        const apiUrl = import.meta.env.VITE_BACKEND_URL
              const response = await fetch(`${apiUrl}/api/${type}/track`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title }),
        });

        
        const data = await response.json();
        
        if (data.success === true) {
          setStockDetails(data.stockinfo)
          console.log(data.stockinfo)
        } 
      } catch (err) {
        console.log(err);
      } finally {
        console.log("hello")
        setLoading(false);
      }
    }

    fetchTrackData();
  }, [type,title]);

const parameters = [
  {
    name: 'Risk',
    value: stockDetails?.Sharpe_Ratio,
    info: 'Measures return per unit of risk. Higher is better.',
    styling: getSharpeColor(stockDetails?.Sharpe_Ratio),
    emoji: getSharpeEmoji(stockDetails?.Sharpe_Ratio),
  },
  {
    name: 'Stability',
    value: stockDetails?.Maximum_Drawdown,
    info: 'Largest drop from peak to trough. Lower means more stable.',
    styling: getDrawdownColor(stockDetails?.Maximum_Drawdown),
  },
  {
    name: 'One year Return',
    value: stockDetails?.Annualized_Return,
    info: 'Total return if performance is sustained for one year.',
    styling: getReturnColor(stockDetails?.Annualized_Return),
    emoji: getReturnEmoji(stockDetails?.Annualized_Return),
  },
];


  useEffect(() => {
    async function fetchRecommendations() {
      setLoading(true);
      try {
        const apiUrl = import.meta.env.VITE_BACKEND_URL
              const response = await fetch(`${apiUrl}/api/${type}/recommend`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        
        if (data.success === true) {
          setRecs(data.stocks);
          
        } else {
          setError(data.message || 'Failed to fetch recommendations.');
        }
      } catch (err) {
        console.log(err);
      }finally {
        setLoading(false); // end loading, no matter what
      }
    }

    fetchRecommendations();
  }, [type]);

  const renderRecommendations = (startIndex, endIndex, title, heading) => {
    const recommendations = recs.slice(startIndex, endIndex);
    if(loading) {return (
      <div className="text-center text-blue-500 font-semibold">
        Loading recommendations...
      </div>
    )}
    if (!recommendations.length) {
      return <p className="text-gray-400">No recommendations available.</p>;
    }
  
    return (
      <div className="bg-gray-900 rounded-xl p-4 shadow-lg">
        
  <h1 className="text-white text-xl font-semibold mb-3">{title}</h1>
  <ul className="space-y-4">
    {recommendations.map((item, index) => (
      <li key={index} className="flex items-center space-x-4">
        
        <div className="flex-1 flex justify-between">
          <div>

          <h4 className="text-lg font-medium text-gray-200">
            {type === "stock" ? item.Stock : item.Scheme_Name}
          </h4>
          <p className="text-sm text-gray-400">
            {type === "stock" ? item.NAME_OF_COMPANY : item.Fund_House}
          </p>
            </div>
          <div className="m-2 space-x-2 flex">
            <button 
            onClick={() => {
              navigate('/track', { state: { title : type === "stock" ? item.Stock : item.Scheme_Name, type : type } });
            }}
            className="px-3 py-1 btn btn-success btn-sm">
              View
            </button>
            {heading!=='Default' && 
            <button 
            onClick={()=>{
              navigate('/compare', { state: { first : location.state.title,second : type === "stock" ? item.Stock : item.Scheme_Name, type : type } });
            }}
            className="px-3 py-1 btn btn-primary btn-sm ">
              Compare
            </button>}
          </div>
        </div>
      </li>
    ))}
  </ul>
</div>
    );
  };

  

  return (
    <>
      <div className="flex justify-center basis-2/3 p-5 md:flex-row bg-gray-950 text-white">
          <div className='w-1/3'>

          <SearchBar
          purpose="search"
          first=""
          second=""
          type={type}
          placeholder={`Search ${type === "stock" ? "stocks" : "funds"}` }
          // onResultSelect={handleSelectFund}
          
          debounceTime={400}
          />
          </div>
          </div>
    <div className="flex flex-col basis-2/3 md:flex-row h-screen bg-gray-950 text-white">
      {/* Chart Section */}
      {title!=='Default'?(<div className="md:basis-2/3 p-4">
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
      </div>):(
        <div className="flex justify-center basis-2/3 mt-5 md:flex-row h-screen bg-gray-950 text-white">
          <div className='w-1/3'>

          
          </div>
          </div>
      )}

      {/* Control Panel */}
      <div className="md:basis-1/3 p-4 space-y-6 overflow-y-auto">
        {title !== 'Default' && (
          <>
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

      <Popover.Root>
        <Popover.Trigger asChild>
          <button
            className="w-5 h-5 flex items-center justify-center rounded-full bg-blue-500 text-white text-xs hover:bg-blue-600"
            title="More info"
          >
            i
          </button>
        </Popover.Trigger>

        <Popover.Content
          className="rounded-xl bg-gray-800 border-cyan-400 shadow-lg w-72 z-50"
          sideOffset={1}
          align="start"
        >
          <div className="flex bg-gray-800 p-5 flex-col space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Info</h3>
            </div>
            <p className="text-sm text-gray-200">{param.info}</p>
            <Popover.Close asChild>
              <button
                onClick={() => openChat(param.name)}
                className="btn btn-success btn-sm flex items-center gap-2"
              >
                Ask AI <Brain size={16} />
              </button>
            </Popover.Close>
          </div>
        </Popover.Content>
      </Popover.Root>
    </div>

    <span className={`text-sm ${param.styling}`}>
      {param.value} {param?.emoji}
    </span>
  </div>
))}


         
        </div> 
        </>
      )}

        {/* Recommendations */}
        {renderRecommendations(10, 15, 'Recommended for You',title)}
        {renderRecommendations(0, 5, 'Stable Stocks',title)}
        {renderRecommendations(5, 10, 'Highest Returns',title)}
      </div>
    </div>
    </>
  );
}

export default Track;