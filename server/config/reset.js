import { pool } from "./database.js";
import movieData from "../data/movies.js";
import "./dotenv.js";

const createMoviesTable = async () => {
  const createTableQuery = `
    DROP TABLE IF EXISTS movies;
    
    CREATE TABLE IF NOT EXISTS movies (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      moviePosterUrl TEXT NOT NULL
    )
  `;
  try {
    await pool.query(createTableQuery);
    console.log("🎉 Movies table created successfully");
  } catch (err) {
    console.error("⚠️ Error creating movies table", err);
  }
};

const createUsersTable = async () => {
  const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    githubid int NOT NULL,
    username varchar(200) NOT NULL,
    avatarurl varchar(500),
    accesstoken varchar(500) NOT NULL
)
`;
  try {
    await pool.query(createUsersTableQuery);
    console.log("users table created successfully");
  } catch (err) {
    console.error("⚠️ Error creating users table", err);
  }
}

const createUserEmailTable = async () => {
  const createUserEmailTableQuery = `
    CREATE TABLE IF NOT EXISTS user_email (
    id serial PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`;
  try {
    await pool.query(createUserEmailTableQuery);
    console.log("users table created successfully");
  } catch (err) {
    console.error("⚠️ Error creating users table", err);
  }
};

const seedMoviesTable = async () => {
  await createMoviesTable();

  for (const movie of movieData) {
    const query = `INSERT INTO movies (name, description, moviePosterUrl) VALUES ($1, $2, $3)`;
    try {
      await pool.query(query, [
        movie.name,
        movie.description,
        movie.moviePosterUrl,
      ]);
      console.log(`✅ ${movie.name} added successfully`);
    } catch (err) {
      console.error(`⚠️ Error inserting movie "${movie.name}"`, err);
    }
  }
};


const resetDatabase = async () => {
  try {
    await seedMoviesTable();
    console.log("🎉 Movies table created and seeded successfully");

    await createUsersTable();
    console.log("🎉 Users table created successfully");

    await createUserEmailTable();
    console.log("🎉 UserEmail table created successfully");
  } catch (err) {
    console.error("⚠️ Error resetting the database", err);
  }
};

resetDatabase();
