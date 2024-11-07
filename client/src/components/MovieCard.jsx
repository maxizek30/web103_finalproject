// MovieCard.js
import { Link } from "react-router-dom";

const MovieCard = ({ movie, index }) => {
  return (
    <Link to={`/movie/${index}`} style={{ textDecoration: "none" }}>
      <div style={styles.card}>
        <img
          src={movie.moviePosterUrl}
          alt={`${movie.name} poster`}
          style={styles.image}
        />
      </div>
    </Link>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    overflow: "hidden",
    margin: "16px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "300px",
  },
  image: {
    width: "100%",
    height: "auto",
    display: "block",
  },
};

export default MovieCard;
