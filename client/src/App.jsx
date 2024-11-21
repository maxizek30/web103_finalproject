import { Routes, Route } from "react-router-dom";
import Movies from "./pages/Movies.jsx";
import PickedMovie from "./pages/PickedMovie.jsx";
import "./App.css";
import { useEffect, useState } from "react";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import { Toaster } from "sonner";
import { useUser } from "./context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import CreateMovie from "./pages/CreateMovie.jsx";
import NextMovie from "./pages/NextMovie.jsx";
import PrevMovie from "./pages/PrevMovie.jsx";
import EditMovie from "./pages/EditMovie.jsx";
import UserSettings from "./pages/UserSettings.jsx";

export default function App() {
  const { user, loginUser } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user && user.id) {
      return;
    }
    const getUser = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login/success`,
        {
          credentials: "include",
        }
      );
      const json = await response.json();
      if (json.user) {
        console.log(json.user);
        loginUser(...Object.values(json.user));
        navigate("/movie-page");
      } else {
        console.log("Can't login through Github.");
      }
    };
    getUser();
    console.log("User:", user);
  }, []);

  return (
    <>
      <Toaster position="top-right" richColors closeButton />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/movie-page" element={<Movies />} />
        <Route path="/movie-next" element={<NextMovie />} />
        <Route path="/movie-prev" element={<PrevMovie />} />
        <Route path="/movie-edit/:movieId" element={<EditMovie />} />
        <Route path="/movie/:movieId" element={<PickedMovie />} />
        <Route path="/movie/create" element={<CreateMovie />} />
        <Route path="/user-settings" element={<UserSettings />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/movie/add" element={<AddMovie />} /> */}
      </Routes>
    </>
  );
}
