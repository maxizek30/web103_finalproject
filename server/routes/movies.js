import express from "express";
import MoviesController from "../controllers/movies.js";

const router = express.Router();

// Route to get all movies
router.get("/", MoviesController.getMovies);

export default router;
