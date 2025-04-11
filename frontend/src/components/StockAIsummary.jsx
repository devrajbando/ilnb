import React, { useState, useEffect } from 'react'
import { Brain } from 'lucide-react'

function StockAIsummary({stock1, stock2}) {
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const summarize = async () => {
          setLoading(true); // Start loading
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
          } finally {
            setLoading(false); // End loading regardless of outcome
          }
        };
        summarize();
    }, [stock1, stock2]);

    return (
        <>
            {loading ? (
                <div className="summary-container w-full max-w-3xl mx-auto bg-gray-800 text-white p-6 rounded-xl shadow-md mt-6">
                    <div className="flex flex-col items-center justify-center space-y-4">
                        <div className="animate-spin">
                            <Brain className="h-8 w-8 text-green-500" />
                        </div>
                        <p className="text-gray-400">Generating comparison summary...</p>
                    </div>
                </div>
            ) : summary && (
                <div className="summary-container w-full max-w-3xl mx-auto bg-gray-800 text-white p-6 rounded-xl shadow-md mt-6">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Comparison Summary</h2>
                    <p className="text-base leading-relaxed">{summary}</p>
                </div>
            )}
        </>
    )
}

export default StockAIsummary