import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import movieData from "../../../server/data/movies";
import Header from "../components/Header";

export default function MoviePicked() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState();

  useEffect(() => {
    setMovie(movieData[movieId]);
  }, [movieId]);

  return (
    <>
      <Header />
      {movie ? (
        <div style={styles.page}>
          <div style={styles.imageContainer}>
            <img
              src={movie.moviePosterUrl}
              alt={`${movie.name} poster`}
              style={styles.image}
            />
          </div>
          <div style={styles.infoContainer}>
            <h1 style={styles.title}>{movie.name}</h1>
            <p style={styles.description}>{movie.description}</p>
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
