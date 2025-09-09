function Loading() {
  return (
  <div className="flex justify-center items-center">
            <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center w-40">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-2 text-gray-700 text-sm font-medium">Loading...</p>
            </div>
          </div>
  );
}

export default Loading;
