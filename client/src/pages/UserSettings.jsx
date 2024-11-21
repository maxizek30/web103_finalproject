import React, { useState } from "react";
import { useUser } from "../context/UserContext";

export default function UserSettings() {
  const [input, setInput] = useState("");
  const { user } = useUser();

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the data or send it to a server
    console.log("Form Data Submitted:", formData);
  };

  return (
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
          {/* Code */}
          <div>
            <label className="text-electricBlue block mb-2">Code</label>
            12345
          </div>
          {/* Code Input */}
          <div>
            <label className="text-electricBlue block mb-2">Import Movie</label>
            <input
              type="email"
              name="email"
              value={input}
              onChange={handleChange}
              className="w-full rounded-lg px-4 py-2 bg-metallicSilver/20 text-metallicSilver shadow-lg outline-none focus:border-neonPink focus:border-2"
              placeholder="Enter code"
            />
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-electricBlue text-darkCharcoal rounded-lg px-4 py-2 mt-6 shadow-md hover:bg-cyberYellow/80 hover:scale-105 duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
