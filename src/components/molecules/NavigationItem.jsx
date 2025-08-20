import React from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const NavigationItem = ({ to, icon, label, badge }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
          "hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/5",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          isActive 
            ? "bg-gradient-to-r from-primary to-blue-700 text-white shadow-lg" 
            : "text-gray-700 hover:text-primary"
        )
      }
    >
      <ApperIcon name={icon} className="w-5 h-5 mr-3 flex-shrink-0" />
      <span className="truncate">{label}</span>
      {badge && (
        <span className="ml-auto bg-accent text-white text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

export default NavigationItem;