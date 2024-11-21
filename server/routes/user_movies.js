import express from "express";
import UserMoviesController from "../controllers/user_movies.js";

const router = express.Router();

// Route to get all movies for a specific user
router.get("/:userId", UserMoviesController.getAllUserMovies);

// Get movies with details for a specific user and status
router.get("/:userId/:status", UserMoviesController.getUserMoviesWithDetails);

// Route to get a specific user movie by its ID
router.get("/movie/:id", UserMoviesController.getUserMovieById);

// Route to delete a user movie by its ID
router.delete("/movie/:id", UserMoviesController.deleteUserMovie);

// Route to update a user movie by its ID
router.put("/movie", UserMoviesController.updateUserMovie);

// Route to create a new user movie
router.post("/", UserMoviesController.createUserMovie);

export default router;
