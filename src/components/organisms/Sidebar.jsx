import React from "react";
import { motion } from "framer-motion";
import NavigationItem from "@/components/molecules/NavigationItem";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ isOpen, onClose }) => {
  const navigationItems = [
    { to: "/", icon: "LayoutDashboard", label: "Dashboard" },
    { to: "/profile", icon: "User", label: "Candidate Profile" },
    { to: "/post-planner", icon: "Calendar", label: "Post Planner" },
    { to: "/whatsapp", icon: "MessageCircle", label: "WhatsApp Generator" },
    { to: "/voice", icon: "Mic", label: "Voice Generator" },
    { to: "/press", icon: "FileText", label: "Press Release" },
    { to: "/speech", icon: "FileTextIcon", label: "Speech Writer" },
    { to: "/slogans", icon: "Lightbulb", label: "Slogan Generator" },
    { to: "/audio", icon: "Radio", label: "Audio Scripts" }
  ];

  // Desktop sidebar (static)
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="w-64 bg-white shadow-xl border-r border-gray-200">
        <div className="flex flex-col h-full">
          <div className="flex items-center px-6 py-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="Vote" className="w-6 h-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-bold font-display gradient-text">Campaign Hub</h1>
                <p className="text-xs text-gray-500">Political Content Platform</p>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </nav>
        </div>
      </div>
    </div>
  );

  // Mobile sidebar (overlay with transform)
  const MobileSidebar = () => (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 lg:hidden"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-6 py-6 border-b border-gray-200">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <ApperIcon name="Vote" className="w-6 h-6 text-white" />
              </div>
              <div className="ml-3">
                <h1 className="text-lg font-bold font-display gradient-text">Campaign Hub</h1>
                <p className="text-xs text-gray-500">Political Content Platform</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <ApperIcon name="X" className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => (
              <NavigationItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </nav>
        </div>
      </motion.div>
    </>
  );

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export default Sidebar;