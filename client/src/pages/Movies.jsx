import MovieCard from "../components/MovieCard";
import movieData from "../../../server/data/movies";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

export default function Movies() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Timer to hide the dropdown after 10 seconds
  useEffect(() => {
    let timer;
    if (isHovered) {
      timer = setTimeout(() => {
        setIsHovered(false);
      }, 10000); // 10 seconds
    }
    return () => clearTimeout(timer); // Cleanup on unmount or hover off
  }, [isHovered]);

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5 py-8">
        {movieData.map((movie, index) => (
          <MovieCard
            key={index}
            movie={movie}
            index={index}
            setIsHovered={setIsHovered}
            isHovered={isHovered}
          />
        ))}
      </div>
    </>
  );
}
