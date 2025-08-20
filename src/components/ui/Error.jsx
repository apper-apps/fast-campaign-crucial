import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong", 
  description = "Please try again or contact support if the problem persists.",
  onRetry
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name="AlertTriangle" className="w-8 h-8 text-error" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{message}</h3>
      <p className="text-sm text-gray-600 text-center mb-6 max-w-md">{description}</p>
      {onRetry && (
        <Button onClick={onRetry} icon="RefreshCw" variant="primary">
          Try Again
        </Button>
      )}
    </div>
  );
};

export default Error;