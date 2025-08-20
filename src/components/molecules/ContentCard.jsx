import React from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const ContentCard = ({ title, description, type, tags = [], status, onAction, actionLabel }) => {
  const statusColors = {
    "Idea": "bg-blue-100 text-blue-800",
    "Draft": "bg-yellow-100 text-yellow-800",
    "Ready": "bg-green-100 text-green-800",
    "Published": "bg-purple-100 text-purple-800"
  };

  const typeIcons = {
    "Image": "Image",
    "Video": "Video",
    "Text": "FileText",
    "Audio": "Headphones"
  };

  return (
    <Card hover className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <ApperIcon name={typeIcons[type] || "FileText"} className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-medium text-gray-500 uppercase">{type}</span>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[status] || statusColors["Idea"]}`}>
          {status}
        </span>
      </div>
      
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{title}</h3>
      {description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{description}</p>
      )}
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
              +{tags.length - 3}
            </span>
          )}
        </div>
      )}
      
      {onAction && actionLabel && (
        <Button size="sm" variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Card>
  );
};

export default ContentCard;