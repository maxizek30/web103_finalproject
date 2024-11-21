import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import UserMovieCard from "../components/UserMovieCard";

const WatchNext = () => {
  const { user } = useUser();
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/user_movies/${user.id}/to_watch`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data); // Set fetched movies with details
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [user.id]);

  return (
    <>
      <Header />
      <h1 className="text-3xl font-bold text-center py-4">Watch Next!</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5 py-8">
        {movies.map((movie) => (
          <UserMovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default WatchNext;
