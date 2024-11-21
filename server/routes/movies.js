import express from "express";
import MoviesController from "../controllers/movies.js";

const router = express.Router();

// Route to get all movies
router.get("/", MoviesController.getMovies);
router.get("/:movieId", MoviesController.getMovieById);
router.post("/", MoviesController.createMovie);
router.delete("/:movieId", MoviesController.deleteMovie);
router.patch("/:movieId", MoviesController.updateMovie);
export default router;
