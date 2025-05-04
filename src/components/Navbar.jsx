import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <nav className="bg-black text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-1">
        
        {/* Animated */}
        <motion.h1
          className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 to-blue-400 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3, ease: "easeOut" }}
        >
        SnapNote📝
        </motion.h1>

        {/* Navbar Buttons */}
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-lg font-medium transition bg-gradient-to-r from-pink-900 to-blue-900 ${
                isActive
                  ? "text-black shadow-md"
                  : "hover:scale-105 hover:shadow-lg hover:brightness-240"
              }`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/pastes"
            className={({ isActive }) =>
              `px-4 py-2 rounded-lg text-lg font-medium transition bg-gradient-to-r from-pink-900 to-blue-900 ${
                isActive
                  ? "text-black shadow-md"
                  : "hover:scale-105 hover:shadow-lg hover:brightness-110"
              }`
            }
          >
            Pastes
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
