import React, { useMemo } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const navLinks = useMemo(
    () => [
      { path: "/", label: "User" },
      { path: "/product", label: "Product" },
    ],
    []
  );

  return (
    <header className="w-full bg-blue-950 sticky top-0 z-50 shadow-md">
      <nav className="container mx-auto flex items-center justify-between py-5 px-4">
        <h1 className="text-white font-bold text-lg tracking-wide">
          Two Cruds
        </h1>

        <div className="flex gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? "text-[#A5C926] border-b-2 border-[#A5C926]"
                    : "text-white hover:text-[#A5C926]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default React.memo(Header);
