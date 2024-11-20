import { useState } from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, index, isHovered, setIsHovered }) => {
  const [singleHover, setSingleHover] = useState(false);
  console.log(isHovered);
  return (
    <div
      className="relative m-4"
      onMouseEnter={() => {
        setIsHovered(true), setSingleHover(true);
      }} // Set hover state on hover
      onMouseLeave={() => {
        setSingleHover(false);
      }} // Remove hover state when
      not
      hovered
    >
      <Link
        to={`/movie/${index}`}
        className={`block transform transition-transform duration-300 ${
          singleHover ? "scale-110" : ""
        }`}
      >
        <div className="relative border border-gray-300 rounded-lg overflow-hidden shadow-md max-w-[300px] z-10">
          <img
            src={movie.moviePosterUrl}
            alt={`${movie.name} poster`}
            className="w-full h-auto block"
          />
        </div>
      </Link>

      {/* Dropdown */}
      <div
        className={`absolute top-13 left-0 w-full bg-black rounded-lg shadow-md p-4 transition-all duration-300 ease-in-out transform ${
          isHovered ? "top-30" : "top-40"
        } overflow-hidden -z-50`}
      >
        <div className="flex self-center space-x-4 bg-black-700">
          <button className="bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold px-2 py-1 rounded-full shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-110 hover:from-red-600 hover:to-red-400 hover:shadow-xl focus:outline-none active:scale-95">
            Add to Next Movie
          </button>
          <button className="bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold px-2 py-1 rounded-full shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-110 hover:from-blue-600 hover:to-blue-400 hover:shadow-xl focus:outline-none active:scale-95">
            Add to Previous
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
