import { useState } from "react";

const UserMovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative m-4"
      onMouseEnter={() => setIsHovered(true)} // Set hover state
      onMouseLeave={() => setIsHovered(false)} // Remove hover state
    >
      <div
        className={`block transform transition-transform duration-300 ${
          isHovered ? "scale-105" : ""
        }`}
      >
        {/* Movie Poster */}
        <div className="relative border border-gray-300 rounded-lg overflow-hidden shadow-md max-w-[300px]">
          <img
            src={movie.movieposterurl}
            alt={`${movie.name} poster`}
            className="w-full h-auto block"
          />
        </div>
        {/* Hover Effect */}
        <div
          className={`absolute inset-0 flex items-end justify-center bg-black bg-opacity-60 text-white text-center opacity-0 ${
            isHovered ? "opacity-100" : ""
          } transition-opacity duration-300`}
        >
          <p className="p-4 text-lg font-bold">{movie.name}</p>
        </div>
      </div>
    </div>
  );
};

export default UserMovieCard;
