import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomBtn1 from "./CustomBtn1";
import CustomBtn2 from "./CustomBtn2";
import { useMovie } from "../context/MovieContext";
const MovieCard = ({ movie, movieIndex }) => {
  const [isHovered, setIsHovered] = useState(false);
  // const [showFirstBtn, setShowFirstBtn] = useState(true);
  // const [showSecondbtn, setShowSecondBtn] = useState(true);
  const {
    showFirstBtn,
    setShowFirstBtn,
    showSecondbtn,
    setShowSecondBtn,
    setNextMovie,
    setPrevMovie,
  } = useMovie();
  const navigate = useNavigate();

  const handleClickFirstBtn = () => {
    setShowFirstBtn((prev) =>
      prev.map((value, index) => (index === movieIndex ? !value : value))
    );
    setNextMovie((prevMovies) => {
      // Check if the movie is already in the array
      if (prevMovies.includes(movie)) {
        // Remove the movie if it exists
        return prevMovies.filter((m) => m !== movie);
      } else {
        // Add the movie if it doesn't exist
        return [...prevMovies, movie];
      }
    });
  };

  const handleClickSecondBtn = () => {
    setShowSecondBtn((prev) =>
      prev.map((value, index) => (index === movieIndex ? !value : value))
    );
    setPrevMovie((prevMovies) => {
      // Check if the movie is already in the array
      if (prevMovies.includes(movie)) {
        // Remove the movie if it exists
        return prevMovies.filter((m) => m !== movie);
      } else {
        // Add the movie if it doesn't exist
        return [...prevMovies, movie];
      }
    });
  };
  return (
    <div
      className="relative m-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`block transform transition-transform duration-300 ${
          isHovered ? "scale-110" : ""
        }`}
      >
        <div className="relative border border-gray-300 rounded-lg overflow-hidden shadow-md max-w-[300px]">
          <div>
            <img
              src={movie.moviePosterUrl}
              alt={`${movie.name} poster`}
              className="w-full h-auto block"
              onClick={() => navigate(`/movie/${movieIndex}`)}
            />
          </div>
        </div>
        {/* Second Div: Appears on hover */}
        <div
          className={`flex-grow w-auto h-auto bg-gray-900 text-white border border-gray-500 rounded-lg shadow-lg duration-200 ease-out transition-all ${
            isHovered ? "translate-y-0 opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-2 p-4">
            <div onClick={handleClickFirstBtn}>
              {showFirstBtn[movieIndex] ? (
                <CustomBtn1
                  firstMessage="Add Next Movie"
                  secondMessage="Movie Time!"
                />
              ) : (
                <CustomBtn2 message="Added to Next Movie" />
              )}
            </div>
            <div onClick={handleClickSecondBtn}>
              {showSecondbtn[movieIndex] ? (
                <CustomBtn1
                  firstMessage="Add Watched Movie"
                  secondMessage="Watched?"
                  color="blue"
                />
              ) : (
                <CustomBtn2 message="Added to Watched Movie" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
