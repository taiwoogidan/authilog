import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  const navLinkStyles = ({ isActive }) =>
    `relative py-2 text-sm font-medium transition-colors duration-200
    ${
      isActive
        ? "text-violet-600"
        : "text-gray-600 hover:text-gray-950"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
        
        {/* Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="group flex items-center gap-2"
          aria-label="Authilog home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 text-sm font-bold text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
            A
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-950">
            authilog
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
        >
          <NavLink to="/about" className={navLinkStyles}>
            About
          </NavLink>

          <NavLink to="/features" className={navLinkStyles}>
            Features
          </NavLink>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/signin"
            className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-950"
          >
            Sign in
          </Link>

          <Link
            to="/signup"
            className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-violet-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
          >
            Get started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-violet-500 md:hidden"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-t border-gray-200/70 bg-white transition-all duration-300 md:hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl flex-col px-5 py-4 sm:px-6"
          aria-label="Mobile navigation"
        >
          <NavLink
            to="/about"
            onClick={closeMenu}
            className={({ isActive }) =>
              `rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-violet-50 text-violet-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-950"
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/features"
            onClick={closeMenu}
            className={({ isActive }) =>
              `rounded-lg px-3 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-violet-50 text-violet-600"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-950"
              }`
            }
          >
            Features
          </NavLink>

          <div className="mt-3 flex flex-col gap-2 border-t border-gray-100 pt-4">
            <Link
              to="/signin"
              onClick={closeMenu}
              className="rounded-lg px-3 py-3 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-100"
            >
              Sign in
            </Link>

            <Link
              to="/signup"
              onClick={closeMenu}
              className="rounded-lg bg-violet-600 px-3 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-violet-700"
            >
              Get started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
