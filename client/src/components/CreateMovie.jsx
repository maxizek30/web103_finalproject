import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateMovie = ({ userId, apiUrl }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    moviePosterUrl: "",
    status: "to_watch", // Default status for user_movies table
  });
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Step 1: Create movie in the movies table
      const movieResponse = await fetch(`${apiUrl}/movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          moviePosterUrl: formData.moviePosterUrl,
        }),
      });

      if (!movieResponse.ok) {
        throw new Error("Error creating movie");
      }

      const movieData = await movieResponse.json();
      const movieId = movieData.movie.id; // Assuming movie is returned with an ID

      // Step 2: Create entry in the user_movies table
      const userMovieResponse = await fetch(`${apiUrl}/user_movies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId, // Pass the user ID as a prop or get it from context/session
          movie_id: movieId,
          status: formData.status,
        }),
      });

      if (!userMovieResponse.ok) {
        throw new Error("Error adding movie to user list");
      }

      toast.success("Movie added successfully!");
      navigate("/"); // Redirect to the movie list or another page after success
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the movie.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add a New Movie</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Movie Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ color: "black" }}
            className="w-full border rounded px-2 py-1 mb-2"
          />
        </label>
        <label className="block mb-2">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            style={{ color: "black" }}
            className="w-full border rounded px-2 py-1 mb-2"
          />
        </label>
        <label className="block mb-2">
          Movie Poster URL:
          <input
            type="text"
            name="moviePosterUrl"
            value={formData.moviePosterUrl}
            style={{ color: "black" }}
            onChange={handleChange}
            required
            className="w-full border rounded px-2 py-1 mb-4"
          />
        </label>
        <button
          type="submit"
          disabled={isSaving}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isSaving ? "Saving..." : "Add Movie"}
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
