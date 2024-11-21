import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { PiArrowFatLeftFill } from "react-icons/pi";
import { GiPopcorn } from "react-icons/gi";
import { FaHome } from "react-icons/fa";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logoutUser } = useUser();

  const logout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  const goback = () => {
    navigate(-1);
  };

  const gohome= () => {
    navigate("/movie-page");
  }
  return (
    <>
      {location.pathname == "/movie-page" ? (
        <h2 className="flex items-center text-4xl ml-5 font-bold tracking-wide hover:scale-125 duration-300 cursor-pointer">
          MovieTrackr <GiPopcorn />
        </h2>
      ) : (
        <div className="flex self-center space-x-4">
          {/* <button
            onClick={goback}
            className="flex items-center bg-electricBlue text-darkCharcoal py-2 px-4 rounded-lg font-bold hover:bg-cyberYellow hover:scale-105 transition duration-300"
          >
            <PiArrowFatLeftFill />
            Back
          </button> */}
          <button
            onClick={gohome}
            className="flex items-center bg-electricBlue text-darkCharcoal py-2 px-4 rounded-lg font-bold hover:bg-cyberYellow hover:scale-105 transition duration-300"
          >
            <FaHome />
            Home
          </button>
        </div>
      )}
    </>
  );
}
