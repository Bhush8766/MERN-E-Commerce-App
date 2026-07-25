const Loader = () => {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow animate-pulse overflow-hidden"
        >
          <div className="h-60 bg-gray-200"></div>

          <div className="p-5 space-y-4">
            <div className="h-5 bg-gray-200 rounded"></div>

            <div className="h-4 bg-gray-200 rounded w-2/3"></div>

            <div className="h-6 bg-gray-200 rounded w-1/3"></div>

            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loader;