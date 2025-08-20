import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No content found", 
  description = "Get started by creating your first item.",
  action,
  actionLabel = "Create New",
  icon = "FileText"
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <ApperIcon name={icon} className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 text-center mb-6 max-w-md">{description}</p>
      {action && (
        <Button onClick={action} icon="Plus" variant="primary">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default Empty;