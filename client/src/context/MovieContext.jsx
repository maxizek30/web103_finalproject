import { useState, useEffect, createContext, useContext } from "react";
import { useUser } from "./UserContext.jsx";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const { user } = useUser();
  const [nextMovie, setNextMovie] = useState([]);
  const [prevMovie, setPrevMovie] = useState([]);
  const [showFirstBtn, setShowFirstBtn] = useState({});
  const [showSecondbtn, setShowSecondBtn] = useState({});
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
        initBtnStatus("all", movies);
        setFilteredMovie(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchNextMovies = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user_movies/${user.id}/to_watch`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch next movies");
        }
        const data = await response.json();
        setNextMovie(data); // Set fetched movies with details
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const fetchPrevMovies = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user_movies/${user.id}/watched`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch prev movies");
        }
        const data = await response.json();
        setPrevMovie(data); // Set fetched movies with details
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchNextMovies();
    fetchPrevMovies();
    fetchMovies();
  }, []);

  useEffect(() => {
    if (nextMovie) {
      initBtnStatus("first", nextMovie, false);
    }
  }, [nextMovie]);
  useEffect(() => {
    initBtnStatus("second", prevMovie, false);
  }, [prevMovie]);

  const initBtnStatus = async (btnName, movies, value = true) => {
    const initialStatus = movies.reduce((acc, movie) => {
      acc[movie.id] = value;
      return acc;
    }, {});

    if (btnName === "all") {
      setShowFirstBtn(initialStatus);
      setShowSecondBtn(initialStatus);
    } else if (btnName === "first") {
      setShowFirstBtn((prevState) => ({
        ...prevState,
        ...initialStatus,
      }));
    } else if (btnName === "second") {
      setShowSecondBtn((prevState) => ({
        ...prevState,
        ...initialStatus,
      }));
    }
  };

  const setBtnStatus = (btnName, movieId, value = true) => {
    if (btnName === "first") {
      setShowFirstBtn((prev) => ({
        ...prev,
        [movieId]: value,
      }));
    } else if (btnName === "second") {
      setShowSecondBtn((prev) => ({
        ...prev,
        [movieId]: value,
      }));
    }
  };

  // Filter the movieData based on the search term
  const filterMovieData = (searchTerm) => {
    const updatedMovies = allMovies.filter((movie) =>
      movie.name.toLowerCase().includes(searchTerm)
    );
    setFilteredMovie(updatedMovies);
  };

  const insertDataUserMovie = async (movieId, movieStatus) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        movie_id: movieId,
        status: movieStatus,
      }),
    };
    try {
      const response = await fetch("/user_movies/", options);
      if (!response.ok) {
        throw new Error("Failed to post movies");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const updateDataUserMovie = async (movieId, movieStatus) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user.id,
        movie_id: movieId,
        status: movieStatus,
      }),
    };
    try {
      const response = await fetch("/user_movies/movie", options);
      if (!response.ok) {
        throw new Error(`Failed to update movie ${movieId}`);
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const toggleMovieData = (movie, target) => {
    if (target === "next") {
      setNextMovie((nextMovies) => {
        const isInNext = nextMovies.some((m) => m.id === movie.id);

        // Remove from the other list if adding to "next"
        setPrevMovie((prevMovies) =>
          prevMovies.filter((m) => m.id !== movie.id)
        );

        setBtnStatus("first", movie.id, false);
        setBtnStatus("second", movie.id, true);
        if (isInNext) {
          // Remove from "next"
          updateDataUserMovie(movie.id, "none");
          return nextMovies.filter((m) => m.id !== movie.id);
        } else {
          // Add to "next"
          insertDataUserMovie(movie.id, "to_watch");
          updateDataUserMovie(movie.id, "to_watch");
          return [...nextMovies, movie];
        }
      });
    } else if (target === "prev") {
      setPrevMovie((prevMovies) => {
        const isInPrev = prevMovies.some((m) => m.id === movie.id);

        // Remove from the other list if adding to "prev"
        setNextMovie((nextMovies) =>
          nextMovies.filter((m) => m.id !== movie.id)
        );

        setBtnStatus("first", movie.id, true);
        setBtnStatus("second", movie.id, false);
        console.log(movie.id, showFirstBtn);
        if (isInPrev) {
          // Remove from "prev"
          updateDataUserMovie(movie.id, "none");
          return prevMovies.filter((m) => m.id !== movie.id);
        } else {
          // Add to "prev"
          insertDataUserMovie(movie.id, "watched");
          updateDataUserMovie(movie.id, "watched");
          return [...prevMovies, movie];
        }
      });
    }
  };

  useEffect(() => {
    if (showFirstBtn) console.log(showFirstBtn);
  }, [showFirstBtn]);
  return (
    <MovieContext.Provider
      value={{
        nextMovie,
        prevMovie,
        showFirstBtn,
        setShowFirstBtn,
        showSecondbtn,
        setBtnStatus,
        setShowSecondBtn,
        toggleMovieData,
        filteredMovie,
        filterMovieData,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => useContext(MovieContext);
