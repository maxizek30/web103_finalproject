import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useMovie } from "../context/MovieContext";
import CustomBtn1 from "../components/CustomBtn1";
import { toast } from "sonner";
export default function MoviePicked() {
  const { movieId } = useParams();
  const { allMovies, deleteMovie } = useMovie();
  const [movie, setMovie] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const movie = allMovies.find((movie) => movie.id === parseInt(movieId));
    if (movie) {
      setMovie(movie);
      console.log("Found movie: ", movie);
    } else {
      console.log("Movie not found");
    }
  }, [movieId, allMovies]);

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
      {movie ? (
        <div style={styles.page}>
          <div style={styles.imageContainer}>
            <img
              src={movie.movieposterurl}
              alt={`${movie.name} poster`}
              style={styles.image}
            />
          </div>
          <div style={styles.infoContainer}>
            <h1 style={styles.title}>{movie.name}</h1>
            <p style={styles.description}>{movie.description}</p>
            {movie.editable == "true" ? (
              <div className="flex justify-start mt-20">
                <div
                  className="p-4"
                  onClick={() => navigate(`/movie-edit/${movieId}`)}
                >
                  <CustomBtn1
                    firstMessage="Edit"
                    secondMessage="Edit"
                    color="green"
                  />
                </div>
                <div className="p-4" onClick={deleteBtnClick}>
                  <CustomBtn1 firstMessage="Delete" secondMessage="Delete" />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <h2>Loading Movie...</h2>
      )}
    </>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    padding: "20px",
    textAlign: "left",
  },
  imageContainer: {
    flex: "1",
    display: "flex",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    maxWidth: "400px",
    height: "auto",
    borderRadius: "8px",
  },
  infoContainer: {
    flex: "2",
    padding: "20px",
  },
  title: {
    marginBottom: "16px",
    fontSize: "2em",
  },
  description: {
    fontSize: "1.2em",
    lineHeight: "1.6",
  },
};
