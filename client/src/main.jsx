import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UserProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { MovieProvider } from "./context/MovieProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MovieProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </MovieProvider>
    </BrowserRouter>
  </StrictMode>
);
