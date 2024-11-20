import express from "express";
import MoviesController from "../controllers/movies.js";

const router = express.Router();

// Route to get all movies
router.get("/", MoviesController.getMovies);
router.post("/", MoviesController.createMovie);

export default router;
