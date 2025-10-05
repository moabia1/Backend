import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-center items-center px-6 py-4">
        {/* Logo */}
        <div className="text-3xl font-bold flex items-center gap-2">
          <span className="text-4xl animate-bounce">🎶</span>
          <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Moodify
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
