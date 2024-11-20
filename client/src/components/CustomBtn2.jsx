export default function CustomBtn2 () {
    return (
      <div className="flex justify-center">
        <a
          href="#_"
          className="group relative inline-flex items-center justify-center overflow-hidden rounded-xl border-2 border-[#003B46] p-4 px-3 py-1.5 font-medium text-[#C4DFE6] shadow-md transition duration-300 ease-out"
        >
          <span className="absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-gray-900 text-white duration-300 group-hover:translate-x-0">
            Watch Already?
          </span>
          <span className="absolute flex h-full w-full transform items-center justify-center bg-gradient-to-r from-blue-700 to-blue-500 text-white font-semibold transition-all duration-300 group-hover:translate-x-full">
            Add to Previous
          </span>
          <span className="invisible relative"> Add to Previous</span>
        </a>
      </div>
    );
}