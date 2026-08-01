import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("marketplace");

  useEffect(() => {
    const sections = [
      "marketplace",
      "how-it-works",
      "pricing",
      "support",
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      sections.forEach((section) => {
        const element = document.getElementById(section);

        if (
          element &&
          scrollPosition >= element.offsetTop &&
          scrollPosition < element.offsetTop + element.offsetHeight
        ) {
          setActiveSection(section);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const desktopLink = (id, label) => (
    <a
      href={`#${id}`}
      className={`text-[16px] transition-all duration-300 ${
        activeSection === id
          ? "text-primary font-bold border-b-2 border-primary pb-1"
          : "text-text-muted hover:text-primary"
      }`}
    >
      {label}
    </a>
  );

  const mobileLink = (id, label) => (
    <a
      href={`#${id}`}
      onClick={() => setMenuOpen(false)}
      className={`transition-all duration-300 ${
        activeSection === id
          ? "text-primary font-semibold"
          : "text-text-muted hover:text-primary"
      }`}
    >
      {label}
    </a>
  );

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface-glass dark:bg-background-dark/70 backdrop-blur-md border-b border-white/40 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)]">
      <div className="max-w-[1280px] mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
          onClick={() => setMenuOpen(false)}
        >
          <svg
            width="140"
            height="42"
            viewBox="0 0 200 60"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient
                id="logo-grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#06B6D4" />
              </linearGradient>
            </defs>

            <g transform="translate(0,10)">
              <path
                d="M10 0 C10 0 40 0 40 5 C40 10 20 12 20 15 L20 25 L35 25 C35 25 35 30 30 30 L20 30 L20 45 L10 45 L10 0"
                fill="url(#logo-grad)"
              />
              <circle cx="45" cy="5" r="5" fill="#10B981" />
              <text
                x="65"
                y="35"
                fontFamily="Inter,sans-serif"
                fontWeight="800"
                fontSize="32"
                fill="#0F172A"
              >
                Fixora
              </text>
            </g>
          </svg>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {desktopLink("marketplace", "Marketplace")}
          {desktopLink("how-it-works", "How it Works")}
          {desktopLink("pricing", "Pricing")}
          {desktopLink("support", "Support")}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className="text-[14px] font-medium text-text-muted hover:text-primary px-4 py-2 rounded-lg hover:bg-primary/5 transition"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-gradient-to-br from-[#004ac6] to-[#57dffe] text-white text-[14px] font-medium px-6 py-2.5 rounded-full shadow-lg hover:-translate-y-1 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10"
        >
          <span
            className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />

          <span
            className={`block h-0.5 w-6 bg-black my-1 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />

          <span
            className={`block h-0.5 w-6 bg-black transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-white shadow-lg ${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 space-y-5">

          {mobileLink("marketplace", "Marketplace")}
          {mobileLink("how-it-works", "How it Works")}
          {mobileLink("pricing", "Pricing")}
          {mobileLink("support", "Support")}

          <hr />

          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="text-center py-2 border rounded-lg"
          >
            Login
          </Link>

          <Link
            to="/register"
            onClick={() => setMenuOpen(false)}
            className="text-center py-3 rounded-full bg-gradient-to-r from-[#004ac6] to-[#57dffe] text-white font-semibold"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;