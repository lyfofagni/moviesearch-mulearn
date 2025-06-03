import React from 'react';
import { Star, Heart } from 'lucide-react';
import { Movie } from '../types/movie';
import { useMovieContext } from '../contexts/MovieContext';

interface MovieCardProps {
  movie: Movie;
}

const placeholderImage = 'https://via.placeholder.com/300x450?text=No+Image';

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { setSelectedMovie, addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  
  const handleClick = () => {
    setSelectedMovie(movie);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(movie.imdbID)) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  const favorite = isFavorite(movie.imdbID);

  return (
    <div 
      className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer group"
      onClick={handleClick}
    >
      <div className="relative pb-[150%]">
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : placeholderImage} 
          alt={movie.Title}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
          <div className="p-4 w-full">
            <p className="text-sm text-gray-300">{movie.Year}</p>
            <p className="text-lg font-semibold line-clamp-2">{movie.Title}</p>
          </div>
        </div>
      </div>

      <button 
        className={`absolute top-2 right-2 p-2 rounded-full ${favorite ? 'bg-pink-600' : 'bg-gray-800/80'} transition-colors duration-300`}
        onClick={handleFavoriteClick}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart className={`h-5 w-5 ${favorite ? 'fill-white text-white' : 'text-white'}`} />
      </button>
    </div>
  );
};

export default MovieCard;