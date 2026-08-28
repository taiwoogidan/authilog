import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function VerifyEmail() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const inputRef = useRef(null);

  const email = localStorage.getItem("emailVerification");

  // Focus the OTP input when the page loads
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Countdown for resend button
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleOtpChange = (e) => {
    // Only allow numbers
    const value = e.target.value.replace(/\D/g, "");

    // Maximum 6 digits
    setOtp(value.slice(0, 6));

    setError("");
    setMessage("");
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email) {
      setError(
        "We couldn't find the email address associated with this verification.",
      );
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/verify-email`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            otp,
            email,
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
          data.message || "The verification code is invalid or has expired.",
        );
        return;
      }

      setMessage(data.message || "Email verified successfully.");

      // The email is no longer needed after verification
      localStorage.removeItem("emailVerification");

      // Give the user a moment to see the success message
      setTimeout(() => {
        navigate("/dashboard");
      }, 1600);
    } catch (error) {
      console.error("Email verification error:", error);

      setError(
        error.message || "Unable to connect to the server. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email || countdown > 0 || resending) return;

    setError("");
    setMessage("");

    try {
      setResending(true);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
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
        setError(data.message || "Unable to resend the verification code.");
        return;
      }

      setMessage(
        data.message || "A new verification code has been sent to your email.",
      );

      // Prevent spam / repeated requests
      setCountdown(60);
      setOtp("");
      inputRef.current?.focus();
    } catch (error) {
      console.error("Resend OTP error:", error);

      setError(
        error.message || "Unable to connect to the server. Please try again.",
      );
    } finally {
      setResending(false);
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
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-violet-50 text-violet-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.7}
                    stroke="currentColor"
                    className="h-7 w-7"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615A2.25 2.25 0 0 1 2.25 6.993V6.75"
                    />
                  </svg>
                </div>
              </div>

              {/* Heading */}
              <div className="text-center">
                <h1 className="text-2xl font-bold tracking-tight text-gray-950">
                  Verify your email
                </h1>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
                  We've sent a 6-digit verification code to
                </p>

                <p className="mt-1 break-all text-sm font-semibold text-gray-900">
                  {email || "your email address"}
                </p>
              </div>

              {/* Messages */}
              <div className="mt-6">
                {message && (
                  <div
                    role="status"
                    className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                  >
                    {message}
                  </div>
                )}

                {error && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    {error}
                  </div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleVerify} className="mt-6">
                <label
                  htmlFor="otp"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Verification code
                </label>

                <input
                  ref={inputRef}
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={otp}
                  onChange={handleOtpChange}
                  placeholder="000000"
                  disabled={loading}
                  required
                  aria-describedby="otp-help"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-4 text-center text-2xl font-bold tracking-[0.45em] text-gray-950 outline-none transition placeholder:text-gray-300 placeholder:tracking-[0.45em] focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 disabled:cursor-not-allowed disabled:bg-gray-100"
                />

                <p
                  id="otp-help"
                  className="mt-2 text-center text-xs text-gray-400"
                >
                  Enter the 6-digit code from your email.
                </p>

                {/* Verify */}
                <button
                  type="submit"
                  disabled={loading || otp.length !== 6}
                  className="mt-6 flex w-full items-center justify-center rounded-lg bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
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
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4Z"
                        />
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    "Verify email"
                  )}
                </button>
              </form>

              {/* Resend */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Didn't receive the code?
                </p>

                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending || countdown > 0 || !email}
                  className="mt-2 text-sm font-semibold text-violet-600 transition hover:text-violet-700 disabled:cursor-not-allowed disabled:text-gray-400"
                >
                  {resending
                    ? "Sending..."
                    : countdown > 0
                      ? `Resend code in ${countdown}s`
                      : "Resend verification code"}
                </button>
              </div>

              {/* Sign in */}
              <div className="mt-6 border-t border-gray-100 pt-6 text-center">
                <p className="text-sm text-gray-500">
                  Already verified?{" "}
                  <Link
                    to="/signin"
                    className="font-semibold text-violet-600 transition hover:text-violet-700"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>

            {/* Security note */}
            <p className="mt-5 text-center text-xs leading-5 text-gray-400">
              Never share your verification code with anyone. Authilog will
              never ask you for it.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
