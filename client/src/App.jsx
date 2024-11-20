import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import MovieList from "./components/MovieList";
import MoviePage from "./pages/MoviePage";
import "./App.css";
import { useEffect, useState } from "react";
import Login from "./pages/Login.jsx";
import Header from "./components/Header.jsx";
import Signup from "./pages/Signup.jsx";
import { Toaster } from "sonner";
import CreateMovie from "./components/CreateMovie.jsx";

function AppRoutes({ user, API_URL }) {
  return useRoutes([
    {
      path: "/",
      element:
        user && user.id ? (
          <MovieList user={user} />
        ) : (
          <Login api_url={API_URL} />
        ),
    },
    {
      path: "/movie/:movieId",
      element: <MoviePage />,
    },
    {
      path: "/movie/create",
      element:
        user && user.id ? (
          <CreateMovie userId={user.id} apiUrl={API_URL} />
        ) : (
          <Login api_url={API_URL} />
        ),
    },
    {
      path: "/signup",
      element: <Signup />,
    },
  ]);
}

function App() {
  const [user, setUser] = useState(null);
  const API_URL = "http://localhost:3001";

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`${API_URL}/auth/login/success`, {
        credentials: "include",
      });
      const json = await response.json();
      setUser(json.user);
    };
    getUser();
    console.log("user", user);
  }, []);
  const logout = async () => {
    const url = `${API_URL}/auth/logout`;
    const response = await fetch(url, { credentials: "include" });
    const json = await response.json();
    window.location.href = "/";
  };

  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <Router>
        <Header user={user} onLogout={logout} />
        <AppRoutes user={user} API_URL={API_URL} />
      </Router>
    </>
  );
}

export default App;
