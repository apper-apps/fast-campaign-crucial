import React from "react";
import ApperIcon from "@/components/ApperIcon";

const Loading = ({ message = "Loading content..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <ApperIcon name="Zap" className="w-6 h-6 text-primary animate-pulse" />
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600 animate-pulse">{message}</p>
    </div>
  );
};

export default Loading;