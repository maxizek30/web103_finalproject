import express from "express";
import cors from "cors";
import "./config/dotenv.js";
import movieRouter from "./routes/movies.js";
import userMovieRouter from "./routes/user_movies.js";
import passport from "passport";
import session from "express-session";
import { gitHubStrategy } from "./config/auth.js";
import authRouter from "./routes/auth.js";
import usersRouter from "./routes/users.js";

const app = express();

app.use(
  session({
    secret: "codepath",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(gitHubStrategy);
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.use(express.json());
app.use("/movies", movieRouter);
app.use("/user_movies", userMovieRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      '<h1 style="text-align: center; margin-top: 50px;">Hello from Movie Tracker App</h1>'
    );
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
