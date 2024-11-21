import { useState, useEffect } from "react";
import { MovieContext } from "./MovieContext";

export const MovieProvider = ({ children }) => {
  const [movieSearch, setMovieSearch] = useState("");
  const [filteredMovie, setFilteredMovie] = useState([]);
  const [allMovies, setAllMovies] = useState([]);

  // Fetch movies from the server on mount
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/movies`);
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const movies = await response.json();
        setAllMovies(movies);
        setFilteredMovie(movies); // Initialize filtered movies with all movies
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  // Filter the movieData based on the search term
  const filterMovieData = (searchTerm) => {
    const updatedMovies = allMovies.filter((movie) =>
      movie.name.toLowerCase().includes(searchTerm)
    );
    setFilteredMovie(updatedMovies);
  };

  return (
    <MovieContext.Provider
      value={{ movieSearch, setMovieSearch, filteredMovie, filterMovieData }}
    >
      {children}
    </MovieContext.Provider>
  );
};
