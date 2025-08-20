import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const TextArea = forwardRef(({ 
  className, 
  label,
  error,
  required = false,
  rows = 4,
  ...props 
}, ref) => {
  const baseStyles = "w-full px-3 py-2 border-2 border-gray-200 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white text-gray-900 resize-vertical";
  
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <textarea
        rows={rows}
        className={cn(
          baseStyles,
          error && "border-error focus:ring-error focus:border-error",
          className
        )}
        ref={ref}
        {...props}
      />
      {error && (
        <p className="text-sm text-error mt-1">{error}</p>
      )}
    </div>
  );
});

TextArea.displayName = "TextArea";

export default TextArea;