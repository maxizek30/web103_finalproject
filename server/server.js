import express from "express";
import cors from "cors";
import "./config/dotenv.js";
import movieRouter from "./routes/movies.js";

const app = express();
app.use(cors())
app.use("/movies", movieRouter);

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      '<h1 style="text-align: center; margin-top: 50px;">Hello from Movie Tracker App</h1>'
    );
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
