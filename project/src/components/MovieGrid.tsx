import React from 'react';
import { useMovieContext } from '../contexts/MovieContext';
import MovieCard from './MovieCard';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';

const MovieGrid: React.FC = () => {
  const { movies, loading, error, searchQuery, selectedMovie } = useMovieContext();

  if (selectedMovie) {
    return null;
  }

  if (loading && !movies.length) {
    return <LoadingState />;
  }

  if (error && searchQuery) {
    return (
      <div className="text-center py-10">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (movies.length === 0 && searchQuery) {
    return (
      <EmptyState 
        message="No movies found"
        subMessage="Try a different search term"
      />
    );
  }

  if (!searchQuery) {
    return (
      <EmptyState 
        message="Search for movies"
        subMessage="Enter a movie title to get started"
        showSearchIcon
      />
    );
  }

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Search Results</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;