import React from 'react';
import { Film } from 'lucide-react';
import { useMovieContext } from '../contexts/MovieContext';

const Header: React.FC = () => {
  const { favorites } = useMovieContext();
  
  return (
    <header className="bg-gray-800 py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Film className="h-8 w-8 text-indigo-500" />
          <h1 className="text-2xl font-bold text-white">CineFlix</h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <span className="text-sm">Favorites</span>
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-3 bg-indigo-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;