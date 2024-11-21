import { useState } from "react";
import { Link } from "react-router-dom";
import CustomBtn1 from "./CustomBtn1";
import CustomBtn2 from "./CustomBtn2";
const MovieCard = ({ movie, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative m-4"
      onMouseEnter={() => setIsHovered(true)} // Set hover state
      onMouseLeave={() => setIsHovered(false)} // Remove hover state
    >
      {/* Movie Link */}
      <Link
        to={`/movie/${index}`}
        className={`block transform transition-transform duration-300 ${
          isHovered ? "scale-110" : ""
        }`}
      >
        <div className="relative border border-gray-300 rounded-lg overflow-hidden shadow-md max-w-[300px]">
          <div>
            <img
              src={movie.movieposterurl}
              alt={`${movie.name} poster`}
              className="w-full h-auto block"
            />
          </div>
        </div>
        {/* Second Div: Appears on hover */}
        <div
          className={`flex-grow w-full h-auto bg-gray-900 text-white border border-gray-500 rounded-lg shadow-lg duration-200 ease-out transition-all ${
            isHovered ? "translate-y-0 opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-2 p-4">
            <CustomBtn1 />
            <CustomBtn2 />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
