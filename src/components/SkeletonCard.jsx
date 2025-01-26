import React from "react";

const SkeletonCard = () => {
  return (
    <div className="w-full bg-gray-200 shadow-lg rounded-xl p-6 animate-pulse">
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="grid grid-cols-2 gap-6 text-sm">
        <div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>
      </div>
      <hr className="my-4" />
      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <hr className="my-4" />
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
      <div className="mt-4 flex justify-between">
        <div className="h-10 bg-gray-300 rounded w-1/4"></div>
        <div className="h-10 bg-gray-300 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;