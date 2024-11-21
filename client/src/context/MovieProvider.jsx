import { useState } from "react";
import { MovieContext } from "./MovieContext";
import movieData from "../../../server/data/movies";

export const MovieProvider = ({ children }) => {
  const [filteredMovie, setFilteredMovie] = useState(movieData);
  const [nextMovie, setNextMovie] = useState([]);
  const [prevMovie, setPrevMovie] = useState([]);
  const [showFirstBtn, setShowFirstBtn] = useState(
    new Array(movieData.length).fill(true)
  );
  const [showSecondbtn, setShowSecondBtn] = useState(
    new Array(movieData.length).fill(true)
  );

  // Filter the movieData based on the search term
  const filterMovieData = (searchTerm) => {
    const updatedMovies = movieData.filter((movie) =>
      movie.name.toLowerCase().includes(searchTerm)
    );
    setFilteredMovie(updatedMovies);
  };

  return (
    <MovieContext.Provider
      value={{
        nextMovie,
        prevMovie,
        showFirstBtn,
        setShowFirstBtn,
        showSecondbtn,
        setShowSecondBtn,
        setNextMovie,
        setPrevMovie,
        filteredMovie,
        filterMovieData,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
