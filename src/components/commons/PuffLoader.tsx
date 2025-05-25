import React from "react";

const PuffLoader = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="relative w-16 h-16">
          <div className="absolute w-full h-full rounded-full border-4 border-t-transparent border-black animate-spin"></div>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className="w-4 h-4 bg-black rounded-full animate-ping"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuffLoader;
