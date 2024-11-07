// MovieList.js
import MovieCard from "./MovieCard";
import movieData from "../../../server/data/movies";

const MovieList = () => {
  return (
    <>
      <h1 style={{ fontSize: "60px", marginLeft: "20px" }}>Movie Trackr</h1>
      <h2 style={{ fontSize: "45px", marginLeft: "20px" }}>Movies</h2>
      <div style={styles.list}>
        {movieData.map((movie, index) => (
          <MovieCard key={index} movie={movie} index={index} />
        ))}
      </div>
    </>
  );
};

const styles = {
  list: {
    display: "flex",
    flexWrap: "wrap",
  },
};

export default MovieList;
