import axios from 'axios';
import { Movie, MovieDetailed } from '../types/movie';

// Free OMDB API key - in a real application, this would be in an environment variable
const API_KEY = '8c51b6b6';
const BASE_URL = 'https://www.omdbapi.com/';

interface OMDBSearchResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

interface OMDBMovieResponse extends MovieDetailed {
  Response: string;
  Error?: string;
}

export const searchMovies = async (query: string): Promise<Movie[]> => {
  if (!query.trim()) return [];
  
  try {
    const response = await axios.get<OMDBSearchResponse>(`${BASE_URL}?s=${encodeURIComponent(query)}&apikey=${API_KEY}`);
    
    if (response.data.Response === 'False') {
      throw new Error(response.data.Error || 'No results found');
    }
    
    return response.data.Search || [];
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      throw new Error('Invalid API key. Please check your API key and try again.');
    }
    throw error;
  }
};

export const getMovieDetails = async (imdbId: string): Promise<MovieDetailed> => {
  try {
    const response = await axios.get<OMDBMovieResponse>(`${BASE_URL}?i=${imdbId}&plot=full&apikey=${API_KEY}`);
    
    if (response.data.Response === 'False') {
      throw new Error(response.data.Error || 'Movie details not found');
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch movie details: ${error.message}`);
    }
    throw error;
  }
};