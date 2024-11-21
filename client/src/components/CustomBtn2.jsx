export default function CustomBtn2({message=""}) {
  return (
    <div className="flex justify-center">
      <button
        className={`relative px-3 py-1.5 overflow-hidden bg-gradient-to-r from-grey-700 to-grey-500 text-white font-semibold border border-gray-100 rounded-lg shadow-inner group`}
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
      >
        {/* Button Text */}
        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white">
         {message}
        </span>
      </button>
    </div>
  );
}
