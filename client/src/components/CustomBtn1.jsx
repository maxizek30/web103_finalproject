import React, { useState } from "react";

export default function CustomBtn1() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex justify-center">
      <button
        className="relative px-3 py-1.5 overflow-hidden bg-gradient-to-r from-red-700 to-red-500 text-white font-semibold border border-gray-100 rounded-lg shadow-inner group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Border Animations */}
        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full"></span>
        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full"></span>
        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full"></span>
        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full"></span>
        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>

        {/* Button Text */}
        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white">
          {isHovered ? "Movie Time!" : "Add to Next Movie"}
        </span>
      </button>
    </div>
  );
}
