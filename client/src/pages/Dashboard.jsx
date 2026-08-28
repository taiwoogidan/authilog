import DashboardHeader from "../components/DashboardHeader";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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
        },
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        setError(data.message || "Unable to load your profile.");
        return;
      }

      // If your backend returns { user: {...} }
      setUser(data.user || data);
    } catch (error) {
      console.error("Profile error:", error);

      setError("Unable to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-7 lg:px-8">
        {/* Loading */}
        {loading && (
          <div className="flex min-h-[60vh] items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-violet-600" />

              <p className="mt-4 text-sm text-gray-500">
                Loading your dashboard...
              </p>
            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="mx-auto max-w-lg py-16 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              !
            </div>

            <h1 className="mt-4 text-lg font-semibold text-gray-900">
              Unable to load dashboard
            </h1>

            <p className="mt-2 text-sm text-gray-500">{error}</p>

            <button
              onClick={getProfile}
              className="mt-5 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Try again
            </button>
          </div>
        )}

        {/* Dashboard */}
        {!loading && !error && user && (
          <>
            {/* Welcome */}
            <section className="mb-8">
              <p className="text-sm font-medium text-violet-600">
                Welcome back
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
                Good morning, {user.fname} 👋
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Here's an overview of your Authilog account.
              </p>
            </section>

            {/* Account status */}
            <section className="mb-6 rounded-2xl border border-violet-200 bg-violet-50 p-5 sm:p-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m9 12 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>

                  <div>
                    <h2 className="text-sm font-semibold text-gray-900">
                      Your account is active
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                      Your Authilog account is ready to use.
                    </p>
                  </div>
                </div>

                <Link
                  to="/security"
                  className="text-sm font-semibold text-violet-700 hover:text-violet-800"
                >
                  Manage security →
                </Link>
              </div>
            </section>

            {/* Stats */}
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {/* Account */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Account status</p>

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xl font-bold text-gray-950">Active</p>

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
                    ✓
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Email</p>

                <div className="mt-3 flex items-center justify-between">
                  <p className="truncate text-sm font-semibold text-gray-950">
                    {user.email}
                  </p>

                  <div className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    ✓
                  </div>
                </div>
              </div>

              {/* Security */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Security</p>

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xl font-bold text-gray-950">Good</p>

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                    🔒
                  </div>
                </div>
              </div>

              {/* Profile */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-sm text-gray-500">Profile</p>

                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xl font-bold text-gray-950">Complete</p>

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600">
                    ✓
                  </div>
                </div>
              </div>
            </section>

            {/* Main dashboard content */}
            <section className="mt-6 grid gap-6 lg:grid-cols-3">
              {/* Recent activity */}
              <div className="rounded-2xl border border-gray-200 bg-white shadow-sm lg:col-span-2">
                <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                  <h2 className="text-sm font-semibold text-gray-950">
                    Recent activity
                  </h2>

                  <p className="mt-1 text-xs text-gray-500">
                    Recent activity on your account
                  </p>
                </div>

                <div className="divide-y divide-gray-100">
                  <div className="flex items-center gap-4 px-5 py-4 sm:px-6">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-50 text-green-600">
                      ✓
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Account accessed
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        You successfully accessed your dashboard.
                      </p>
                    </div>

                    <span className="hidden text-xs text-gray-400 sm:block">
                      Recently
                    </span>
                  </div>

                  <div className="flex items-center gap-4 px-5 py-4 sm:px-6">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                      ✓
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Email verified
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Your email address has been verified.
                      </p>
                    </div>

                    <span className="hidden text-xs text-gray-400 sm:block">
                      Recently
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick actions */}
              <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-sm font-semibold text-gray-950">
                  Quick actions
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Manage your account
                </p>

                <div className="mt-5 space-y-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 transition hover:border-violet-200 hover:bg-violet-50"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                      👤
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Edit profile
                      </p>

                      <p className="text-xs text-gray-500">
                        Update your information
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/security"
                    className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 transition hover:border-violet-200 hover:bg-violet-50"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                      🔒
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Security
                      </p>

                      <p className="text-xs text-gray-500">
                        Protect your account
                      </p>
                    </div>
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 transition hover:border-violet-200 hover:bg-violet-50"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
                      ⚙
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Settings
                      </p>

                      <p className="text-xs text-gray-500">
                        Manage preferences
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </section>

            {/* Account information */}
            <section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5">
                <h2 className="text-sm font-semibold text-gray-950">
                  Account information
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Your current account details
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Full name
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {user.fname} {user.lname}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Email address
                  </p>

                  <p className="mt-1 truncate text-sm font-medium text-gray-900">
                    {user.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Email verification
                  </p>

                  <p className="mt-1 text-sm font-medium text-green-600">
                    Verified
                  </p>
                </div>
              </div>
            </section>

            {/* Footer */}
            <footer className="mt-10 border-t border-gray-200 py-6">
              <p className="text-center text-xs text-gray-400">
                © {new Date().getFullYear()} Authilog. All rights reserved.
              </p>
            </footer>
          </>
        )}
      </main>
    </div>
  );
}
