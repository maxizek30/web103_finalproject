import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const AddMovie = () => {
  const { user } = useUser();
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [status, setStatus] = useState("to_watch");
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  // Fetch movies from the movies table
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/movies`);
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
        toast.error("Failed to load movies");
      }
    };
    fetchMovies();
  }, []);

  const handleAddMovie = async () => {
    if (!selectedMovie) {
      toast.error("Please select a movie to add.");
      return;
    }

    setIsSaving(true);

    try {
      // Create entry in the user_movies table
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/user_movies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            movie_id: selectedMovie.id,
            status: status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Error adding movie to user list");
      }

      toast.success("Movie added successfully!");
      navigate("/movie-page"); // Redirect after adding the movie
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the movie.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add a Movie to Your List</h2>
      <label className="block mb-2">
        Select a Movie:
        <select
          onChange={(e) =>
            setSelectedMovie(
              movies.find((movie) => movie.id === parseInt(e.target.value))
            )
          }
          className="w-full border rounded px-2 py-1 mb-4"
          style={{ color: "black" }}
        >
          <option value="">-- Select a Movie --</option>
          {movies.map((movie) => (
            <option key={movie.id} value={movie.id}>
              {movie.name}
            </option>
          ))}
        </select>
      </label>
      <label className="block mb-2">
        Status:
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded px-2 py-1 mb-4"
          style={{ color: "black" }}
        >
          <option value="to_watch">To Watch</option>
          <option value="watched">Watched</option>
        </select>
      </label>
      <button
        onClick={handleAddMovie}
        disabled={isSaving}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {isSaving ? "Adding..." : "Add Movie"}
      </button>
    </div>
  );
};

export default AddMovie;
