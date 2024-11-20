import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import BackButton from "./BackButton";
export default function Header() {
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();
  const [moviePick, setMoviePick] = useState("");

  const handleMovieChange = (e) => {
    setMoviePick(e.target.value);
  };

  //   const handleKeyDown = (e) => {
  //     if (e.key === "Enter" && citySelected) {
  //       setCity(citySelected);
  //       navigate("/");
  //       setCitySelected("");
  //     }
  //   };

  const logout = async () => {
    const url = `${import.meta.env.VITE_API_URL}/auth/logout`;
    const response = await fetch(url, { credentials: "include" });
    // const json = await response.json();
    logoutUser();
    navigate("/");
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white py-5 px-5 flex justify-between items-center shadow-lg">
      <BackButton />
      {/* Search Bar */}
      <div className="flex-grow mx-4 max-w-xs relative">
        <IoIosSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />{" "}
        {/* Icon positioned inside the container */}
        <input
          type="text"
          value={moviePick}
          onChange={(e) => {
            handleMovieChange(e);
          }}
          //   onKeyDown={(e) => {
          //     handleKeyDown(e);
          //   }}
          placeholder="Search for a movie..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 outline-none"
        />
      </div>
      <div className="flex justify-center space-x-4 mr-4">
        <button
          onClick={logout}
          className="bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:from-red-600 hover:to-red-400 hover:scale-110 transition-transform duration-300"
        >
          Next Movie
        </button>
        <button
          onClick={logout}
          className="bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-400 hover:scale-110 transition-transform duration-300"
        >
          Previous
        </button>
      </div>

      <div className="flex items-center space-x-4 mr-5">
        {user && (
          <>
            {user.avatarurl ? (
              <img
                src={user.avatarurl}
                alt="User Avatar"
                className="w-12 h-12 rounded-full border-2 border-gray-300 hover:scale-125 duration-300 cursor-pointer"
              />
            ) : (
              <h2 className="text-lg font-semibold hover:scale-125 duration-300 cursor-pointer">
                {user.username}
              </h2>
            )}
          </>
        )}

        <button
          onClick={logout}
          className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-600 hover:scale-125 duration-300 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
  },
  title: {
    fontSize: "1.5em",
  },
  userSection: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  logoutButton: {
    padding: "5px 10px",
    backgroundColor: "#ff4d4d",
    border: "none",
    borderRadius: "5px",
    color: "#fff",
    cursor: "pointer",
  },
};
