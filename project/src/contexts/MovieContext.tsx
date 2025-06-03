import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { searchMovies, getMovieDetails } from '../services/movieService';
import { Movie, MovieDetailed } from '../types/movie';

interface MovieContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  movies: Movie[];
  loading: boolean;
  error: string | null;
  selectedMovie: MovieDetailed | null;
  setSelectedMovie: (movie: Movie | null) => void;
  recentSearches: string[];
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider = ({ children }: MovieProviderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovieState] = useState<MovieDetailed | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const fetchMovies = async () => {
        setLoading(true);
        setError(null);
        try {
          const result = await searchMovies(searchQuery);
          setMovies(result);
          
          // Add to recent searches
          if (searchQuery.length > 2 && !recentSearches.includes(searchQuery)) {
            setRecentSearches(prev => [searchQuery, ...prev.slice(0, 4)]);
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Failed to fetch movies');
          setMovies([]);
        } finally {
          setLoading(false);
        }
      };

      const timeoutId = setTimeout(fetchMovies, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setMovies([]);
    }
  }, [searchQuery, recentSearches]);

  const setSelectedMovie = async (movie: Movie | null) => {
    if (movie) {
      setLoading(true);
      try {
        const details = await getMovieDetails(movie.imdbID);
        setSelectedMovieState(details);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    } else {
      setSelectedMovieState(null);
    }
  };

  const addToFavorites = (movie: Movie) => {
    setFavorites(prev => {
      if (prev.some(m => m.imdbID === movie.imdbID)) {
        return prev;
      }
      return [...prev, movie];
    });
  };

  const removeFromFavorites = (id: string) => {
    setFavorites(prev => prev.filter(movie => movie.imdbID !== id));
  };

  const isFavorite = (id: string) => {
    return favorites.some(movie => movie.imdbID === id);
  };

  return (
    <MovieContext.Provider value={{
      searchQuery,
      setSearchQuery,
      movies,
      loading,
      error,
      selectedMovie,
      setSelectedMovie,
      recentSearches,
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite
    }}>
      {children}
    </MovieContext.Provider>
  );
};