import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useUser } from "../context/UserContext";
import Header from "../components/Header";
import { useMovie } from "../context/MovieContext";

const CreateMovie = () => {
  const { user } = useUser();
  const { setAllMovies, addBtnStatus } = useMovie();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    movieposterurl: "",
    status: "none", // Default status for user_movies table
  });
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("In create movie component, USERID: ", user);
  }, [user]);

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
      const movieResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/movies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            description: formData.description,
            movieposterurl: formData.movieposterurl,
            editable: "true",
          }),
        }
      );
      console.log(movieResponse)
      if (!movieResponse.ok) {
        throw new Error("Error creating movie");
      }

      const movieData = await movieResponse.json();
      const movieId = movieData.movie.id; // Assuming movie is returned with an ID

      // Step 2: Create entry in the user_movies table
      const userMovieResponse = await fetch(
        `${import.meta.env.VITE_API_URL}/user_movies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            movie_id: movieId,
            status: formData.status,
          }),
        }
      );

      if (!userMovieResponse.ok) {
        throw new Error("Error adding movie to user list");
      }
      toast.success("Movie added successfully!");
      setAllMovies((prev) => [...prev, movieData.movie]);
      addBtnStatus(movieData.movie.id);
      navigate("/movie-page");
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while adding the movie.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!user || !user.id) {
    // If the user is not logged in, display a login prompt
    return (
      <>
        <Header />
        <div className="container mx-auto p-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Please Log In</h2>
          <p className="text-gray-600 mb-6">
            You need to be logged in to add a new movie to your list.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Go to Login
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Add a New Movie</h2>
        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          {/* Left: Movie Poster Preview */}
          <div className="flex-2 flex items-center justify-center border rounded-lg p-4 bg-gray-100">
            {formData.movieposterurl ? (
              <img
                src={formData.movieposterurl}
                alt="Movie Poster Preview"
                className="max-w-full max-h-96 object-contain"
              />
            ) : (
              <p className="text-gray-500">
                Movie poster preview will appear here
              </p>
            )}
          </div>

          {/* Right: Form Fields */}
          <div className="flex-1">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">
                  Movie Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 text-gray-800"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">
                  Description:
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 text-gray-800"
                />
              </div>
              <div className="mb-4">
                <label className="block text-lg font-medium mb-2">
                  Movie Poster URL:
                </label>
                <input
                  type="text"
                  name="movieposterurl"
                  value={formData.movieposterurl}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 text-gray-800"
                />
              </div>
              <button
                type="submit"
                disabled={isSaving}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                {isSaving ? "Saving..." : "Add Movie"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateMovie;
