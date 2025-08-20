import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-blue-700 text-white hover:from-blue-800 hover:to-primary focus:ring-primary shadow-lg hover:shadow-xl transform hover:scale-105",
    secondary: "bg-gradient-to-r from-secondary to-red-700 text-white hover:from-red-700 hover:to-secondary focus:ring-secondary shadow-lg hover:shadow-xl transform hover:scale-105",
    accent: "bg-gradient-to-r from-accent to-yellow-500 text-white hover:from-yellow-600 hover:to-accent focus:ring-accent shadow-lg hover:shadow-xl transform hover:scale-105",
    outline: "border-2 border-primary text-primary bg-white hover:bg-primary hover:text-white focus:ring-primary",
    ghost: "text-gray-700 hover:bg-gray-100 focus:ring-gray-500",
    success: "bg-gradient-to-r from-success to-green-600 text-white hover:from-green-600 hover:to-success focus:ring-success shadow-lg hover:shadow-xl transform hover:scale-105"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
    xl: "px-8 py-4 text-lg"
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      ref={ref}
      {...props}
    >
      {loading ? (
        <ApperIcon name="Loader2" className="w-4 h-4 animate-spin mr-2" />
      ) : (
        icon && iconPosition === "left" && (
          <ApperIcon name={icon} className="w-4 h-4 mr-2" />
        )
      )}
      {children}
      {icon && iconPosition === "right" && !loading && (
        <ApperIcon name={icon} className="w-4 h-4 ml-2" />
      )}
    </button>
  );
});

Button.displayName = "Button";

export default Button;