const Button = ({ children, isLoading }: { children: React.ReactNode; isLoading: boolean }) => {
  return (
    <div className="relative">
      <button className="flex items-center p-4  bg-gray-200 rounded-lg overflow-hidden text-[#1b1b1d] group relative">
        <span className="flex flex-col h-6 overflow-hidden relative z-30 text-lg sm:text-xl md:text-xl ">
          <span className="text-white transform -translate-y-full group-hover:transform group-hover:-translate-y-1 duration-300 ease-in-out">
            {children}
          </span>
          <span
            className="text-black transform -translate-y-8 
            group-hover:transform group-hover:translate-y-full duration-300 ease-in-out">
            {!isLoading && children}
          </span>
        </span>
        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#1b1b1d] rounded-lg w-0 h-0 group-hover:w-full group-hover:h-full transition-all duration-300 ease-in-out"></span>
      </button>
      {isLoading && (
        <svg
          className="animate-spin h-8 absolute top-3 right-8 "
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
    </div>
  );
};

export default Button;
