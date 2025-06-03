import React from 'react';
import { Star, ArrowLeft, Clock, Calendar, Award, Heart } from 'lucide-react';
import { useMovieContext } from '../contexts/MovieContext';

const placeholderImage = 'https://via.placeholder.com/300x450?text=No+Image';

const MovieDetails: React.FC = () => {
  const { 
    selectedMovie, 
    setSelectedMovie, 
    loading,
    addToFavorites,
    removeFromFavorites,
    isFavorite
  } = useMovieContext();

  if (!selectedMovie) {
    return null;
  }

  const handleBackClick = () => {
    setSelectedMovie(null);
  };

  const handleFavoriteClick = () => {
    if (isFavorite(selectedMovie.imdbID)) {
      removeFromFavorites(selectedMovie.imdbID);
    } else {
      addToFavorites(selectedMovie);
    }
  };

  const favorite = isFavorite(selectedMovie.imdbID);

  return (
    <div className="animate-fadeIn">
      <button 
        className="flex items-center text-indigo-400 hover:text-indigo-300 transition-colors mb-6"
        onClick={handleBackClick}
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to results
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <img 
              src={selectedMovie.Poster !== 'N/A' ? selectedMovie.Poster : placeholderImage} 
              alt={selectedMovie.Title}
              className="w-full object-cover"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold mb-2">{selectedMovie.Title}</h1>
            <button 
              className={`p-2 rounded-full ${favorite ? 'bg-pink-600' : 'bg-gray-700'} transition-colors duration-300`}
              onClick={handleFavoriteClick}
              aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart className={`h-6 w-6 ${favorite ? 'fill-white text-white' : 'text-white'}`} />
            </button>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-yellow-500">
              <Star className="h-5 w-5 fill-yellow-500 mr-1" />
              <span>{selectedMovie.imdbRating} / 10</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Clock className="h-5 w-5 mr-1" />
              <span>{selectedMovie.Runtime}</span>
            </div>
            <div className="flex items-center text-gray-400">
              <Calendar className="h-5 w-5 mr-1" />
              <span>{selectedMovie.Year}</span>
            </div>
            {selectedMovie.Rated !== 'N/A' && (
              <div className="px-2 py-1 bg-gray-700 rounded text-sm">
                {selectedMovie.Rated}
              </div>
            )}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Plot</h2>
            <p className="text-gray-300 leading-relaxed">{selectedMovie.Plot}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Cast</h2>
              <p className="text-gray-300">{selectedMovie.Actors}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Director</h2>
              <p className="text-gray-300">{selectedMovie.Director}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Genre</h2>
            <div className="flex flex-wrap gap-2">
              {selectedMovie.Genre.split(', ').map((genre, index) => (
                <span key={index} className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm">
                  {genre}
                </span>
              ))}
            </div>
          </div>

          {selectedMovie.Awards !== 'N/A' && (
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <Award className="h-5 w-5 text-yellow-500 mr-2" />
                <h2 className="text-xl font-semibold">Awards</h2>
              </div>
              <p className="text-gray-300">{selectedMovie.Awards}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;