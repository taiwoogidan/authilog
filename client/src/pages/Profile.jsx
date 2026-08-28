import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardHeader from "../components/DashboardHeader";

export default function Profile() {
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
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to load your profile.");
        return;
      }

      setUser(data.user || data);
    } catch (error) {
      console.error("Profile error:", error);

      setError(
        "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const getInitials = () => {
    if (!user) return "?";

    const first = user.fname?.charAt(0) || "";
    const last = user.lname?.charAt(0) || "";

    return `${first}${last}`.toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="mx-auto max-w-6xl px-5 py-8 sm:px-7 lg:px-8">

        {/* Page heading */}
        <div className="mb-8">
          <p className="text-sm font-medium text-violet-600">
            Account
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">
            Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-gray-200 bg-white">
            <div className="flex flex-col items-center">

              <div className="h-9 w-9 animate-spin rounded-full border-4 border-gray-200 border-t-violet-600" />

              <p className="mt-4 text-sm text-gray-500">
                Loading your profile...
              </p>

            </div>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">

            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              !
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              Unable to load profile
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
              {error}
            </p>

            <button
              type="button"
              onClick={getProfile}
              className="mt-5 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            >
              Try again
            </button>

          </div>
        )}

        {/* Profile */}
        {!loading && !error && user && (
          <div className="space-y-6">

            {/* Profile overview */}
            <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

              {/* Top section */}
              <div className="border-b border-gray-100 px-5 py-6 sm:px-7">

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                  <div className="flex items-center gap-4">

                    {/* Avatar */}
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xl font-bold text-violet-700 ring-4 ring-violet-50">
                      {getInitials()}
                    </div>

                    <div className="min-w-0">

                      <h2 className="truncate text-xl font-bold text-gray-950">
                        {user.fname} {user.lname}
                      </h2>

                      <p className="mt-1 truncate text-sm text-gray-500">
                        {user.email}
                      </p>

                      <div className="mt-2 flex items-center gap-2">

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">

                          <span className="h-1.5 w-1.5 rounded-full bg-green-500" />

                          Active
                        </span>

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-3.5 w-3.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m9 12 2 2 4-4m5.5 0a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z"
                            />
                          </svg>

                          Verified
                        </span>

                      </div>

                    </div>

                  </div>

                  <Link
                    to="/profile/edit"
                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
                  >
                    Edit profile
                  </Link>

                </div>

              </div>

              {/* Personal information */}
              <div className="px-5 py-6 sm:px-7">

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-950">
                    Personal information
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    Your basic account information.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">

                  {/* First name */}
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      First name
                    </p>

                    <p className="mt-2 text-sm font-medium text-gray-900">
                      {user.fname || "Not provided"}
                    </p>
                  </div>

                  {/* Last name */}
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Last name
                    </p>

                    <p className="mt-2 text-sm font-medium text-gray-900">
                      {user.lname || "Not provided"}
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Email address
                    </p>

                    <p className="mt-2 break-all text-sm font-medium text-gray-900">
                      {user.email}
                    </p>
                  </div>

                  {/* Verification */}
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Email verification
                    </p>

                    <div className="mt-2 flex items-center gap-2">

                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-600">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="h-3.5 w-3.5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-7.25 9a.75.75 0 0 1-1.127.075l-4.25-4.5a.75.75 0 1 1 1.09-1.03l3.662 3.875 6.738-8.363a.75.75 0 0 1 1.052-.109Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </span>

                      <span className="text-sm font-medium text-green-600">
                        Email verified
                      </span>

                    </div>
                  </div>

                </div>

              </div>

            </section>

            {/* Security */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

              <div className="border-b border-gray-100 px-5 py-5 sm:px-7">

                <h2 className="text-sm font-semibold text-gray-950">
                  Security
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Keep your account secure.
                </p>

              </div>

              <div className="divide-y divide-gray-100">

                {/* Password */}
                <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">

                  <div className="flex items-center gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
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
                          d="M16.5 10.5V7.125a4.125 4.125 0 0 0-8.25 0V10.5m-.75 0h9.75A1.75 1.75 0 0 1 19 12.25v7A1.75 1.75 0 0 1 17.25 21h-10.5A1.75 1.75 0 0 1 5 19.25v-7a1.75 1.75 0 0 1 1.75-1.75Z"
                        />
                      </svg>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Password
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Manage your account password.
                      </p>
                    </div>

                  </div>

                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-violet-600 hover:text-violet-700"
                  >
                    Change password →
                  </Link>

                </div>

                {/* Account security */}
                <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">

                  <div className="flex items-center gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                      ✓
                    </div>

                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Account security
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        Your account is currently protected.
                      </p>
                    </div>

                  </div>

                  <Link
                    to="/security"
                    className="text-sm font-semibold text-violet-600 hover:text-violet-700"
                  >
                    View security →
                  </Link>

                </div>

              </div>

            </section>

            {/* Account */}
            <section className="rounded-2xl border border-gray-200 bg-white shadow-sm">

              <div className="border-b border-gray-100 px-5 py-5 sm:px-7">

                <h2 className="text-sm font-semibold text-gray-950">
                  Account
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Manage your account settings.
                </p>

              </div>

              <div className="px-5 py-5 sm:px-7">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Account status
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      Your Authilog account is active and in good standing.
                    </p>
                  </div>

                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Active
                  </span>

                </div>

              </div>

            </section>

          </div>
        )}

        {/* Footer */}
        {!loading && (
          <footer className="mt-10 border-t border-gray-200 py-6">
            <p className="text-center text-xs text-gray-400">
              © {new Date().getFullYear()} Authilog. All rights reserved.
            </p>
          </footer>
        )}

      </main>
    </div>
  );
}
