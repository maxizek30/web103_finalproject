// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieList from "./components/MovieList";
import MoviePage from "./pages/MoviePage"; // Create this component
import "./App.css";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:movieId" element={<MoviePage />} />
      </Routes>
    </Router>
  );
}

export default App;
