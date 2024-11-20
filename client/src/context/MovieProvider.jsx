import { useState } from "react";
import { MovieContext } from "./MovieContext";
import movieData from "../../../server/data/movies";

export const MovieProvider = ({ children }) => {
  const [movieSearch, setMovieSearch] = useState("");
  const [filteredMovie, setFilteredMovie] = useState(movieData);

  // Filter the movieData based on the search term
  const filterMovieData = (searchTerm) => {
    const updatedMovies = movieData.filter((movie) =>
      movie.name.toLowerCase().includes(searchTerm)
    );
    setFilteredMovie(updatedMovies);
    console.log(updatedMovies);
  }

  return <MovieContext.Provider value={{movieSearch, setMovieSearch, filteredMovie, filterMovieData}}>{children}</MovieContext.Provider>;
};

