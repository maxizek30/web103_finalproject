import { pool } from "../config/database.js";

const getMovies = async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM movies");
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export default {
    getMovies,
};
