const Button = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center p-4  bg-gray-200 rounded-lg overflow-hidden text-[#1b1b1d] group relative">
      <span className="flex flex-col h-6 overflow-hidden relative z-30 text-lg sm:text-xl md:text-xl ">
        <span className="text-white transform -translate-y-full group-hover:transform group-hover:-translate-y-1 duration-300 ease-in-out">
          {children}
        </span>
        <span
          className="text-black transform -translate-y-8 
            group-hover:transform group-hover:translate-y-full duration-300 ease-in-out">
          {children}
        </span>
      </span>
      <span className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#1b1b1d] rounded-lg w-0 h-0 group-hover:w-full group-hover:h-full transition-all duration-300 ease-in-out"></span>
    </button>
  );
};

export default Button;
