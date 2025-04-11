import React,{useState,useEffect} from 'react'
import { Brain } from 'lucide-react'
function StockAIsummary({stock1,stock2}) {

    const [summary, setSummary] = useState('');
    // console.log(company1,company2)
    useEffect(() => {
        const summarize = async () => {
          try {
            const apiUrl = import.meta.env.VITE_BACKEND_URL
                  const response = await fetch(`${apiUrl}/api/chat/summary`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                Company_one: stock1,
                Company_two: stock2
              }),
            });
            const data = await response.json();
            if (response.ok) {
              setSummary(data.response);
            } 
          } catch (error) {
            console.error(error);
          }
        };
        summarize();
      }, [stock1,stock2]);
  return (
    <>
    {summary && (
      <div className="summary-container w-full max-w-3xl mx-auto bg-gray-800 text-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Comparison Summary</h2>
      <p className="text-base leading-relaxed">{summary}</p>
    </div>
    
    )}
    </>
  )
}

export default StockAIsummary