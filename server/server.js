import express from "express";
import dotenv from "dotenv";
import router from "./routes/movies.js";
import { resetDatabase } from "./config/reset.js";

const app = express();

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      '<h1 style="text-align: center; margin-top: 50px;">Hello from Movie Tracker App</h1>'
    );
});

// Use the movies router for handling movie-related routes
app.use("/movies", router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});

resetDatabase();
