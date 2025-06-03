import React from 'react';
import { MovieProvider } from './contexts/MovieContext';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import MovieGrid from './components/MovieGrid';
import Footer from './components/Footer';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <MovieProvider>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <SearchBar />
          <MovieGrid />
          <MovieDetails />
        </main>
        <Footer />
      </div>
    </MovieProvider>
  );
}

export default App;