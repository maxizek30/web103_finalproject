import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import MoviesController from "../controllers/movies.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Route to get all movies
router.get("/", MoviesController.getMovies);

export default router;
