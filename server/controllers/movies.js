import { pool } from "../config/database.js";

const getMovies = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM movies");
    res.status(200).json(results.rows);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

const createMovie = async (req, res) => {
  const { name, description, moviePosterUrl } = req.body;
  if (!name || !description || !moviePosterUrl) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const results = await pool.query(
      "INSERT INTO movies (name, description, moviePosterUrl) VALUES ($1, $2, $3) RETURNING *",
      [name, description, moviePosterUrl]
    );
    res
      .status(201)
      .json({ message: "Movie created successfully", movie: results.rows[0] });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export default {
  getMovies,
  createMovie,
};
