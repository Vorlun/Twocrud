import React, { useMemo } from "react";

const Footer = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  const footerLinks = useMemo(
    () => [
      { label: "User", path: "/" },
      { label: "Product", path: "/product" },
    ],
    []
  );

  return (
    <footer className="bg-blue-950 text-white py-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-4">
        <h2 className="text-lg font-semibold">Two Cruds</h2>

        <nav className="flex gap-6 text-sm">
          {footerLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.path}
              className="hover:text-[#A5C926] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-gray-300">
          © {year} Two Cruds. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
