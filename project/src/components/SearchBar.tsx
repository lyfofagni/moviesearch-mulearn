import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useMovieContext } from '../contexts/MovieContext';

const SearchBar: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    loading,
    recentSearches
  } = useMovieContext();

  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    setSearchQuery('');
  };

  const handleRecentSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="max-w-2xl mx-auto mb-8">
      <div className="relative">
        <div className={`flex items-center bg-gray-800 rounded-lg overflow-hidden transition-all duration-300 ${isFocused ? 'ring-2 ring-indigo-500' : ''}`}>
          <Search className="h-5 w-5 text-gray-400 ml-3" />
          <input
            type="text"
            placeholder="Search for movies..."
            className="w-full px-4 py-3 bg-transparent text-white focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          {searchQuery && (
            <button 
              className="p-2 text-gray-400 hover:text-white transition-colors"
              onClick={handleClear}
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {loading && (
          <div className="absolute right-14 top-1/2 -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {isFocused && recentSearches.length > 0 && (
          <div className="absolute w-full mt-2 bg-gray-800 rounded-lg shadow-lg z-10 overflow-hidden">
            <div className="p-2 text-sm text-gray-400">Recent searches</div>
            <ul>
              {recentSearches.map((query, index) => (
                <li key={index}>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-700 text-white"
                    onClick={() => handleRecentSearch(query)}
                  >
                    {query}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;