import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useMovie } from "../context/MovieContext";
import { toast } from "sonner";

export default function EditMovie() {
  const { movieId } = useParams();
  const { deleteMovie, updateMovie } = useMovie();
  const [movie, setMovie] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchMovieById = async () => {
      const response = await fetch(`/movies/${movieId}`);
      const data = await response.json();
      setMovie(data);
    };

    fetchMovieById();
  }, [movieId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(movie),
    };
    fetch(`/movies/${movieId}`, options);
    toast.success("Movie Updated!");
    updateMovie(movieId, movie);
  };

  const deleteBtnClick = async () => {
    const options = {
      method: "DELETE",
    };
    try {
      fetch(`/movies/${movieId}`, options);
      deleteMovie(movieId);
      toast.success("Delete Successfully!");
      navigate("/movie-page");
    } catch (error) {
      toast.error("Movie Already Deleted.");
    }
  };

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Add a New Movie</h2>
        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          {/* Left: Movie Poster Preview */}
          <div className="flex-2 flex items-center justify-center border rounded-lg p-4 bg-gray-100">
            {movie ? (
              <img
                src={movie.movieposterurl}
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
                  value={movie ? movie.name : ""}
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
                  value={movie ? movie.description : ""}
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
                  value={movie ? movie.movieposterurl : ""}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 text-gray-800"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Update Movie
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
