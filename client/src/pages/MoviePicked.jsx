import React from "react";
import { useParams } from "react-router-dom";
import movieData from "../../../server/data/movies";

export default function MoviePicked () {
  const { movieId } = useParams();
  const movie = movieData[movieId];

  if (!movie) {
    return <h2>Movie not found</h2>;
  }

  return (
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
  );
};

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
