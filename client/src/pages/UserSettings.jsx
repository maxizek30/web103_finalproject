import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import Header from "../components/Header";
import { useMovie } from "../context/MovieContext";
import { toast } from "sonner";

export default function UserSettings() {
  const [input, setInput] = useState("");
  const { user } = useUser();
  const { updateNextMovie, updatePrevMovie } = useMovie();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const getUserByUsername = async () => {
      const res = await fetch(`/users/${input}`);
      const data = await res.json();
      const res1 = await fetch(`/user_movies/${data.id}/to_watch`);
      const res2 = await fetch(`/user_movies/${data.id}/watched`);
      const dataToWatch = await res1.json();
      const dataWatched = await res2.json();
      if (dataToWatch?.message === undefined) {
        console.log("Importing next movie...");
        updateNextMovie(dataToWatch.id, dataToWatch);
      }
      if (dataWatched?.message === undefined) {
        console.log("Importing prev movie...");
        updatePrevMovie(dataWatched.id, dataWatched);
      }
      toast.success("Imported Movie!");
    };
    getUserByUsername();
  };

  return (
    <>
      <Header />
      <div className="h-screen flex items-center justify-center bg-gray-800 text-white">
        <div className="border border-gray-700 shadow-xl rounded-xl w-96 bg-gray-900/50 backdrop-blur-md p-8">
          <h1 className="text-3xl font-semibold text-cyberYellow mb-6">
            Settings
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="text-electricBlue block mb-2">Name</label>
              {user ? user.username : ""}
            </div>
            {/* Code Input */}
            <div>
              <label className="text-electricBlue block mb-2">
                Import Movie
              </label>
              <input
                name="input"
                value={input}
                onChange={handleChange}
                className="w-full rounded-lg px-4 py-2 bg-metallicSilver/20 text-metallicSilver shadow-lg outline-none focus:border-neonPink focus:border-2"
                placeholder="Enter User Name"
              />
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-electricBlue text-darkCharcoal rounded-lg px-4 py-2 mt-6 shadow-md hover:bg-cyberYellow/80 hover:scale-105 duration-300"
            >
              Import
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
