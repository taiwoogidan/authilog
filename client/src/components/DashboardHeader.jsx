import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function DashboardHeader() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [error, setError] = useState("");

  const getProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/profile`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to load profile.");
        return;
      }

      setUser(data.user || data);
    } catch (error) {
      console.error("Profile error:", error);

      setError("Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  // Don't allow an unauthenticated user
  // to remain on the dashboard.
  useEffect(() => {
    if (!loading && !user) {
      navigate("/signin", { replace: true });
    }
  }, [loading, user, navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        navigate("/signin", { replace: true });
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-7 lg:px-8">

        {/* Logo */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-sm font-bold text-white shadow-sm">
            A
          </div>

          <span className="text-lg font-bold tracking-tight text-gray-950">
            authilog
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Notification */}
          <button
            type="button"
            className="relative rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
            aria-label="Notifications"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9a6 6 0 1 0-12 0v.75a8.967 8.967 0 0 1-2.31 6.022c1.733.64 3.55 1.09 5.453 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
              />
            </svg>

            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-violet-600" />
          </button>

          {/* User */}
          <div className="relative">

            <button
              type="button"
              onClick={() => setShowMenu((prev) => !prev)}
              className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-gray-100"
              aria-label="Open user menu"
              aria-expanded={showMenu}
            >

              {/* Avatar */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                {loading
                  ? "..."
                  : user
                  ? `${user.fname?.charAt(0) || ""}${user.lname?.charAt(0) || ""}`
                  : "?"}
              </div>

              {/* Name */}
              <div className="hidden text-left sm:block">

                <p className="max-w-32 truncate text-sm font-semibold text-gray-900">
                  {loading
                    ? "Loading..."
                    : user
                    ? `${user.fname} ${user.lname}`
                    : "User"}
                </p>

                <p className="max-w-32 truncate text-xs text-gray-500">
                  {loading
                    ? "..."
                    : user?.email || ""}
                </p>

              </div>

              {/* Chevron */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className={`hidden h-4 w-4 text-gray-400 transition-transform sm:block ${
                  showMenu ? "rotate-180" : ""
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m6 9 6 6 6-6"
                />
              </svg>

            </button>

            {/* Dropdown */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">

                {/* User info */}
                <div className="border-b border-gray-100 px-4 py-4">

                  <p className="truncate text-sm font-semibold text-gray-900">
                    {user
                      ? `${user.fname} ${user.lname}`
                      : "User"}
                  </p>

                  <p className="mt-1 truncate text-xs text-gray-500">
                    {user?.email}
                  </p>

                </div>

                {/* Links */}
                <div className="p-2">

                  <Link
                    to="/profile"
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-950"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0ZM4.5 20.25a7.5 7.5 0 0 1 15 0"
                      />
                    </svg>

                    Profile
                  </Link>

                  <Link
                    to="/security"
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-950"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3 5 6v5c0 4.5 3 8.5 7 10 4-1.5 7-5.5 7-10V6l-7-3Z"
                      />
                    </svg>

                    Security
                  </Link>

                  <Link
                    to="/settings"
                    onClick={() => setShowMenu(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50 hover:text-gray-950"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6h10.5M3 6h3m0 0a2 2 0 1 0 4 0m-4 0a2 2 1 1 4 0M3 12h10.5m3 0H21m-4.5 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0M3 18h3m3 0h12m-9 0a2 2 0 1 0-4 0m4 0a2 2 0 1 1-4 0"
                      />
                    </svg>

                    Settings
                  </Link>

                </div>

                {/* Logout */}
                <div className="border-t border-gray-100 p-2">

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.8}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3-3H9m0 0 3-3m-3 3 3 3"
                      />
                    </svg>

                    Sign out
                  </button>

                </div>

              </div>
            )}

          </div>
        </div>
      </div>

      {/* Error banner */}
      {error && (
        <div className="border-t border-red-200 bg-red-50 px-5 py-2 text-center text-xs text-red-600">
          {error}
        </div>
      )}

    </header>
  );
}
