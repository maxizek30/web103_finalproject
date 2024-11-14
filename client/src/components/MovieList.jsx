// MovieList.js
import MovieCard from "./MovieCard";
import movieData from "../../../server/data/movies";
import {useEffect} from "react";

const MovieList = (props) => {
    useEffect(() => {
        console.log(props.user);
    }, []);
  return (
    <>
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
