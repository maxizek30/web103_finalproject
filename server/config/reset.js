import { pool } from "./database.js";
import movieData from "../data/movies.js";
import "./dotenv.js";

const createMoviesTable = async () => {
  const createTableQuery = `    
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
    githubid int,
    username TEXT NOT NULL,
    avatarurl TEXT,
    accesstoken TEXT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)
`;
  try {
    await pool.query(createUsersTableQuery);
    console.log("Users table created successfully");
  } catch (err) {
    console.error("⚠️ Error creating users table", err);
  }
};

const createUserMoviesTable = async () => {
  const createUserMoviesTableQuery = `
    CREATE TABLE IF NOT EXISTS user_movies (
      id SERIAL PRIMARY KEY,
      user_id INT NOT NULL,
      movie_id INT NOT NULL,
      status VARCHAR(20) CHECK (status IN ('to_watch', 'watched')),
      added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (movie_id) REFERENCES movies(id),
      UNIQUE (user_id, movie_id, status)
    )
  `;
  try {
    await pool.query(createUserMoviesTableQuery);
    console.log("🎉 UserMovies table created successfully");
  } catch (err) {
    console.error("⚠️ Error creating user_movies table", err);
  }
};

const seedMoviesTable = async () => {
  await createMoviesTable();

  for (const movie of movieData) {
    const query = `
    INSERT INTO movies (name, description, moviePosterUrl) 
    VALUES ($1, $2, $3)
    ON CONFLICT (name) DO NOTHING
    `;
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
  } catch (err) {
    console.error("⚠️ Error resetting the database", err);
  }
};

resetDatabase();
