import React, { useState,useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import StockComparisonCard from "./StockComparisonCard";
import StockAIsummary from "./StockAIsummary"
import SearchBar from './SearchBar';
function Compare() {
  const companies = ["Company A", "Company B", "Company C"];
  const [company1, setCompany1] = useState("");
  const [company2, setCompany2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  const { first,second, type } = location.state || { first: 'Default',second: 'Default', type: 'stock' };

  console.log(location.state)

  useEffect(() => {
    async function fetchFirstData(){
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
          body: JSON.stringify({ title:first }),
        });

        
        const data = await response.json();
        
        if (data.success === true) {
          setCompany1(data.stockinfo)
          console.log(data.stockinfo)
        } 
      } catch (err) {
        console.log(err);
      } finally {
        console.log("hello")
        setLoading(false);
      }
    }
    fetchFirstData()
  }, [first])

  useEffect(() => {
    async function fetchSecondData(){
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
          body: JSON.stringify({ title:second }),
        });

        
        const data = await response.json();
        
        if (data.success === true) {
          setCompany2(data.stockinfo)
          console.log(data.stockinfo)
        } 
      } catch (err) {
        console.log(err);
      } finally {
        console.log("hello")
        setLoading(false);
      }
    }
    fetchSecondData()
  }, [second])
  
   if (loading) {
    return <div className="text-center py-10 text-lg">⏳ Loading comparison...</div>;
  }



  // if (!company1 || !company2) {
  //   return (
  //     <>

  //     </>
  //   )
  // }

  return (
    <div className="min-h-screen w-full bg-gray-900 p-4">
  <div className="flex justify-center gap-4 mb-6">
    <div className="w-1/4 text-white">
      <SearchBar 
      purpose = "compare1"
      type={type}
      first={first}
      second={second}
      placeholder={`Search ${type === "stock" ? "stocks" : "funds"}` }
      // onResultSelect={handleSelectFund}
      
      debounceTime={400}
      />
    </div>
    <div className="w-1/4 text-white">
      <SearchBar 
      purpose ="compare2"
      first={first}
      second={second}
      type={type}
      placeholder={`Search ${type === "stock" ? "stocks" : "funds"}` }
      // onResultSelect={handleSelectFund}
      
      debounceTime={400}
      />
    </div>
  </div>

  {company1 && !company2 && (
  <div className="text-white text-center">
    <div className="text-xl font-semibold mb-2">
      Selected {type === "stock" ? "Stock" : "Fund"}: {type === "stock" ? company1.NAME_OF_COMPANY : company1.Scheme_Name}
    </div>
    <p className="text-gray-300">Now search for another {type === "stock" ? "stock" : "fund"} to compare.</p>
  </div>
)}

{!company1 && company2 && (
  <div className="text-white text-center">
    <div className="text-xl font-semibold mb-2">
      Selected {type === "stock" ? "Stock" : "Fund"}: {type === "stock" ? company2.NAME_OF_COMPANY : company2.Scheme_Name}
    </div>
    <p className="text-gray-300">Now search for another {type === "stock" ? "stock" : "fund"} to compare.</p>
  </div>
)}
  
  {company1 && company2 && (
    <>
    <StockComparisonCard stock1={company1} stock2={company2} type={type}/>
    <StockAIsummary stock1={company1} stock2={company2} type={type}/>
    </>
  ) }

  

</div>

  );
  
}

export default Compare;
