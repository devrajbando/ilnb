import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar({ type, placeholder, debounceTime = 300 }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectResult = (item) => {
    console.log(item);
    setQuery(item.name);
    setShowResults(false);

    navigate('/track', {
      state: { title: type === 'stock' ? item.Stock : item.Scheme_Name, type: type },
    });
  };

  const searchFunds = async () => {
    if (!query.trim()) return;

    setLoading(true); // Set loading to true before starting the search
    try {
      const apiUrl = import.meta.env.VITE_BACKEND_URL
              const response = await fetch(`${apiUrl}/api/${type}/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          query,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        setResults(data);
      } else {
        console.error('Error:', data.message || 'Failed search response.');
        setResults([]); // Clear results on error
      }
    } catch (error) {
      console.error('Search error:', error.message);
      setResults([]); // Clear results on error
    } finally {
      setLoading(false); // Reset loading state after search completes
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim().length > 2) {
        searchFunds();
      } else {
        setResults([]);
        setLoading(false); // Reset loading if query is too short
      }
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [query, debounceTime]);

  return (
    <>
      <div className="relative w-full" ref={searchRef}>
        <label className="input w-full flex items-center">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder || 'Search Mutual Funds and Stocks'}
            className="w-full outline-none"
            onFocus={() => query.trim().length > 2 && setShowResults(true)}
          />
          {loading && (
            <div className="ml-2 animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
          )}
        </label>

        {/* Results dropdown */}
        {showResults && results.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg rounded-md max-h-60 overflow-y-auto">
            {results.map((item) => (
              <div
                key={item._id}
                className="p-3 text-white hover:bg-gray-600 bg-gray-800 cursor-pointer border-b last:border-b-0"
                onClick={() => handleSelectResult(item)}
              >
                <div className="font-medium">{item.Stock}</div>
                <div className="text-sm text-gray-400 flex justify-between">
                  <span>{item.NAME_OF_COMPANY}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loading message */}
        {loading && query.trim().length > 2 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-800 shadow-lg rounded-md p-3 text-center text-gray-200">
            Loading...
          </div>
        )}

        {/* No results message */}
        {showResults && query.trim().length > 2 && !loading && results.length === 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg rounded-md p-3 text-center text-gray-500">
            No results found
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBar;