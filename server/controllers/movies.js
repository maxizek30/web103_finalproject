import { pool } from "../config/database.js";

const getMovies = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM movies");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const selectQuery = `
      SELECT name, description, movieposterurl
      FROM movies
      WHERE id=$1
    `;
    const { movieId } = req.params;
    const results = await pool.query(selectQuery, [movieId]);
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const createMovie = async (req, res) => {
  const { name, description, movieposterurl, editable } = req.body;
  console.log(movieposterurl);
  if (!name || !description || !movieposterurl) {
    return res.status(400).json({ message: "All fields are required" });
  }
  console.log(name);
  try {
    console.log(name);
    const results = await pool.query(
      "INSERT INTO movies (name, description, movieposterurl, editable) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, description, movieposterurl, editable]
    );
    res
      .status(201)
      .json({ message: "Movie created successfully", movie: results.rows[0] });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// Delete a movie by ID
const deleteMovie = async (req, res) => {
  const { movieId } = req.params;
  console.log(movieId);
  try {
    const results = await pool.query(
      "DELETE FROM movies WHERE id = $1 RETURNING *",
      [movieId]
    );
    if (results.rowCount === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({
      message: "Movie deleted successfully",
      deletedMovie: results.rows[0],
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const { name, description, movieposterurl } = req.body;
    console.log(movieId, name, description);
    const results = await pool.query(
      `
    UPDATE movies SET name = $1, description = $2, movieposterurl = $3 WHERE id = $4`,
      [name, description, movieposterurl, movieId]
    );
    res.status(200).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  getMovies,
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
};
