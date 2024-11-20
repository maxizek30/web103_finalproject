import { pool } from "../config/database.js";

const checklogin = async (req, res) => {
  try {
    const selectQuery = `
      SELECT id, email, username, password
      FROM user_email
      WHERE username=$1 AND password=$2
    `;
    const { username, password } = req.body;
    const results = await pool.query(selectQuery, [username, password]);
    if (results.rowCount === 1){
        return res.status(200).json(results.rows[0]);
    } else if (results.rowCount === 0) {
        res.status(401).json("Wrong username or password");
    }
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

const checksignup = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const results = await pool.query(
      `
  INSERT INTO user_email (email, username, password)
  VALUES($1, $2, $3)
  RETURNING *`,
      [email, username, password]
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export default {
  checklogin,
  checksignup,
};
