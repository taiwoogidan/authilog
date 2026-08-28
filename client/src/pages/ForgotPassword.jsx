import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: trimmedEmail,
          }),
        },
      );

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error("Something went wrong. Please try again.");
      }

      if (!response.ok) {
        setError(
          data.message || "Unable to process your request. Please try again.",
        );
        return;
      }

      /*
       * Store only the email temporarily.
       *
       * The reset-password page can use this to know
       * which account the reset code belongs to.
       */
      localStorage.setItem("passwordResetEmail", trimmedEmail);

      setMessage(
        data.message ||
          "If an account exists with this email, a reset code has been sent.",
      );

      /*
       * Give the success message a moment to display
       * before moving to the reset page.
       */
      setTimeout(() => {
        navigate("/reset-password");
      }, 3000);
    } catch (error) {
      console.error("Forgot password error:", error);

      setError(
        error.message || "Unable to connect to the server. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <main className="min-h-[calc(100vh-4rem)] bg-gray-50 px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-9rem)] max-w-md items-center justify-center">
          <div className="w-full">
            {/* Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              {/* Heading */}
              <div className="mb-7 text-center">
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-lg font-bold text-white shadow-sm">
                  A
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-gray-950">
                  Forgot your password?
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Enter the email address associated with your account and we'll
                  send you a password reset code.
                </p>
              </div>

              {/* Success message */}
              {message && (
                <div
                  role="status"
                  className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm leading-5 text-green-700"
                >
                  {message}
                </div>
              )}

              {/* Error message */}
              {error && (
                <div
                  role="alert"
                  className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700"
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleForgotPassword} noValidate>
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>

                  <input
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    inputMode="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError("");
                      setMessage("");
                    }}
                    disabled={loading}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:bg-gray-100"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 flex w-full items-center justify-center rounded-lg bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <svg
                        className="mr-2 h-4 w-4 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />

                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 0 0-8-8v4a4 4 0 0 1 4 4h4Z"
                        />
                      </svg>
                      Sending reset code...
                    </>
                  ) : (
                    "Send reset code"
                  )}
                </button>
              </form>

              {/* Back to sign in */}
              <div className="mt-6 text-center">
                <Link
                  to="/signin"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 transition hover:text-violet-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                  Back to sign in
                </Link>
              </div>
            </div>

            {/* Security note */}
            <p className="mt-5 text-center text-xs leading-5 text-gray-400">
              For your security, password reset codes expire after a short
              period of time.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
