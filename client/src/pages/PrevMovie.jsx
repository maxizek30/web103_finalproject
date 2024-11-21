import MovieCard from "../components/MovieCard";
import movieData from "../../../server/data/movies";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useMovie } from "../context/MovieContext";

export default function PrevMovie() {
  const navigate = useNavigate();
  const { prevMovie, filteredMovie } = useMovie();

  return (
    <>
      <Header />
      <>
        <h2 className="text-3xl font-bold mb-6 mt-6 text-center">Watched Movie</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-5 py-8">
        {prevMovie.map((movie, index) => (
          <MovieCard key={index} movie={movie} movieIndex={movie.id} />
        ))}
      </div>
      </>
    </>
  );
}
