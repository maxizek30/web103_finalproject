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

seedMoviesTable();
// const resetDatabase = async () => {
//   try {
//     await seedMoviesTable();
//     console.log("🎉 Movies table created and seeded successfully");
//   } catch (err) {
//     console.error("⚠️ Error resetting the database", err);
//   }
// };

// export { resetDatabase };
