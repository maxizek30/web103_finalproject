import { pool } from "../config/database.js";

// Get all user movies
const getAllUserMovies = async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed as a route parameter
  try {
    const results = await pool.query(
      "SELECT * FROM user_movies WHERE user_id = $1",
      [userId]
    );
    if (results.rows.length === 0) {
      return res.status(404).json({ message: "No movies found for this user" });
    }
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Get a user movie by ID
const getUserMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await pool.query(
      "SELECT * FROM user_movies WHERE id = $1",
      [id]
    );
    if (results.rows.length === 0) {
      return res.status(404).json({ message: "User movie not found" });
    }
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Delete a user movie by ID
const deleteUserMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await pool.query(
      "DELETE FROM user_movies WHERE id = $1 RETURNING *",
      [id]
    );
    if (results.rowCount === 0) {
      return res.status(404).json({ message: "User movie not found" });
    }
    res.status(200).json({
      message: "User movie deleted successfully",
      deletedMovie: results.rows[0],
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Update a user movie by ID
const updateUserMovie = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const results = await pool.query(
      "UPDATE user_movies SET status = $1, added_date = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
      [status, id]
    );
    if (results.rowCount === 0) {
      return res.status(404).json({ message: "User movie not found" });
    }
    res.status(200).json({
      message: "User movie updated successfully",
      updatedMovie: results.rows[0],
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Create a new user movie entry
const createUserMovie = async (req, res) => {
  const { user_id, movie_id, status } = req.body;
  try {
    const results = await pool.query(
      `INSERT INTO user_movies (user_id, movie_id, status, added_date) 
             VALUES ($1, $2, $3, CURRENT_TIMESTAMP) 
             RETURNING *`,
      [user_id, movie_id, status]
    );
    res.status(201).json({
      message: "User movie created successfully",
      createdMovie: results.rows[0],
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default {
  getAllUserMovies,
  getUserMovieById,
  deleteUserMovie,
  updateUserMovie,
  createUserMovie,
};
