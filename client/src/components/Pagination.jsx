const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">

      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`px-4 py-2 rounded-lg border ${
          currentPage === 1
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-white hover:bg-blue-600 hover:text-white"
        }`}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`w-10 h-10 rounded-lg ${
            currentPage === index + 1
              ? "bg-blue-600 text-white"
              : "bg-white border hover:bg-gray-100"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`px-4 py-2 rounded-lg border ${
          currentPage === totalPages
            ? "bg-gray-200 cursor-not-allowed"
            : "bg-white hover:bg-blue-600 hover:text-white"
        }`}
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;