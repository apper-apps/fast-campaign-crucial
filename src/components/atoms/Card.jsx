import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  className, 
  children,
  hover = true,
  gradient = false,
  ...props 
}, ref) => {
  const baseStyles = "bg-white rounded-lg shadow-lg border border-gray-100 transition-all duration-300";
  const hoverStyles = hover ? "hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1" : "";
  const gradientStyles = gradient ? "bg-gradient-to-br from-white to-gray-50" : "";
  
  return (
    <div
      className={cn(baseStyles, hoverStyles, gradientStyles, className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;