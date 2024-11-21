import MovieCard from "../components/MovieCard";
import movieData from "../../../server/data/movies";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useMovie } from "../context/MovieContext";

export default function NextMovie() {
  const navigate = useNavigate();
  const { nextMovie, filteredMovie } = useMovie();
  
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5 py-8">
        {nextMovie.map((movie, index) => (
          <MovieCard key={index} movie={movie} movieIndex={index} />
        ))}
      </div>
    </>
  );
}
