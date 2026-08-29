import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function PasswordReset() {
  const navigate = useNavigate();

  const email = localStorage.getItem("passwordResetEmail");

  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordRequirements = [
    {
      label: "8+ characters",
      valid: password.length >= 8,
    },
    {
      label: "Lowercase letter",
      valid: /[a-z]/.test(password),
    },
    {
      label: "Uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "Number",
      valid: /[0-9]/.test(password),
    },
    {
      label: "Special character",
      valid: /[!@#$%^&*(),.?":{}|<>_\-\\[\]/`~;'+=]/.test(password),
    },
  ];

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email) {
      setError(
        "Password reset session not found. Please request a new reset code.",
      );
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[0-9]/.test(password)) {
      setError("Password must contain at least one number.");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]/`~;'+=]/.test(password)) {
      setError("Password must contain at least one special character.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/reset-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
            password,
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
          data.message || "Unable to reset your password. Please try again.",
        );
        return;
      }

      setMessage(data.message || "Your password has been reset successfully.");

      // Remove the temporary email after successful reset
      localStorage.removeItem("passwordResetEmail");

      // Give the user a moment to see the success message
      setTimeout(() => {
        navigate("/signin");
      }, 1200);
    } catch (error) {
      console.error("Password reset error:", error);

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
                  Reset your password
                </h1>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Enter the verification code we sent to your email and create a
                  new password.
                </p>

                {email && (
                  <p className="mt-3 truncate text-sm font-medium text-gray-700">
                    {email}
                  </p>
                )}
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

              <form onSubmit={handleResetPassword} noValidate>
                {/* OTP */}
                <div>
                  <label
                    htmlFor="otp"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Verification code
                  </label>

                  <input
                    type="text"
                    id="otp"
                    name="otp"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6);

                      setOtp(value);
                      setError("");
                    }}
                    disabled={loading}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-3 text-center text-lg font-semibold tracking-[0.35em] text-gray-950 outline-none transition placeholder:font-normal placeholder:tracking-normal placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:bg-gray-100"
                  />

                  <p className="mt-2 text-xs text-gray-400">
                    Enter the 6-digit code sent to your email.
                  </p>
                </div>

                {/* New password */}
                <div className="mt-5">
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    New password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      autoComplete="new-password"
                      placeholder="Create a new password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                      disabled={loading}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 pr-20 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 transition hover:text-gray-900 focus:outline-none"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  {/* Password requirements */}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {passwordRequirements.map((requirement) => (
                      <div
                        key={requirement.label}
                        className={`flex items-center gap-2 text-xs ${
                          requirement.valid ? "text-green-600" : "text-gray-400"
                        }`}
                      >
                        <span className="text-sm">
                          {requirement.valid ? "✓" : "○"}
                        </span>

                        {requirement.label}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Confirm password */}
                <div className="mt-5">
                  <label
                    htmlFor="confirmPassword"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Confirm new password
                  </label>

                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      autoComplete="new-password"
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError("");
                      }}
                      disabled={loading}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 pr-20 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 transition hover:text-gray-900 focus:outline-none cursor-pointer"
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-7 flex w-full items-center justify-center rounded-lg bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer"
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
                      Resetting password...
                    </>
                  ) : (
                    "Reset password"
                  )}
                </button>
              </form>

              {/* Back to sign in */}
              <p className="mt-6 text-center text-sm text-gray-500">
                Remember your password?{" "}
                <Link
                  to="/signin"
                  className="font-semibold text-violet-600 transition hover:text-violet-700"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Security note */}
            <p className="mt-5 text-center text-xs leading-5 text-gray-400">
              Your verification code expires after a short period of time. Never
              share your code with anyone.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
