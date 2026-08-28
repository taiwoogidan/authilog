import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Signup() {
  const navigate = useNavigate();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    // Client-side validation
    if (fname.trim().length < 2) {
      setError("First name must be at least 2 characters.");
      return;
    }

    if (lname.trim().length < 2) {
      setError("Last name must be at least 2 characters.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter.");
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

    try {
      setLoading(true);

      const user = {
        fname: fname.trim(),
        lname: lname.trim(),
        email: email.trim().toLowerCase(),
        password,
      };

      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      );

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error("Something went wrong. Please try again.");
      }

      if (!response.ok) {
        setError(data.message || "Unable to create your account.");
        return;
      }

      setMessage(data.message || "Account created successfully.");

      // Store email temporarily for email verification
      localStorage.setItem("emailVerification", user.email);

      // Navigate to verification page
      setTimeout(() => {
        navigate("/verify");
      }, 700);
    } catch (error) {
      console.error("Signup error:", error);

      setError(
        error.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const passwordRequirements = [
    {
      label: "8+ characters",
      valid: password.length >= 8,
    },
    {
      label: "Uppercase letter",
      valid: /[A-Z]/.test(password),
    },
    {
      label: "Lowercase letter",
      valid: /[a-z]/.test(password),
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

  return (
    <>
      <Header />

      <main className="min-h-[calc(100vh-4rem)] bg-gray-50 px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="mx-auto flex max-w-md items-center justify-center">
          <div className="w-full">

            {/* Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

              {/* Heading */}
              <div className="mb-7 text-center">
                <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600 text-lg font-bold text-white shadow-sm">
                  A
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-gray-950">
                  Create your account
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                  Get started with Authilog today.
                </p>
              </div>

              {/* Success message */}
              {message && (
                <div
                  role="status"
                  className="mb-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
                >
                  {message}
                </div>
              )}

              {/* Error message */}
              {error && (
                <div
                  role="alert"
                  className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSignup} noValidate>

                {/* Names */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstname"
                      className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      First name
                    </label>

                    <input
                      type="text"
                      id="firstname"
                      name="fname"
                      autoComplete="given-name"
                      placeholder="John"
                      value={fname}
                      onChange={(e) => setFname(e.target.value)}
                      disabled={loading}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastname"
                      className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      Last name
                    </label>

                    <input
                      type="text"
                      id="lastname"
                      name="lname"
                      autoComplete="family-name"
                      placeholder="Doe"
                      value={lname}
                      onChange={(e) => setLname(e.target.value)}
                      disabled={loading}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="mt-5">
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
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:bg-gray-100"
                  />
                </div>

                {/* Password */}
                <div className="mt-5">
                  <label
                    htmlFor="password"
                    className="mb-1.5 block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      autoComplete="new-password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={loading}
                      required
                      className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 pr-20 text-sm text-gray-950 outline-none transition placeholder:text-gray-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 disabled:cursor-not-allowed disabled:bg-gray-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-gray-500 transition hover:text-gray-900 focus:outline-none"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
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
                          requirement.valid
                            ? "text-green-600"
                            : "text-gray-400"
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

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-7 flex w-full items-center justify-center cursor-pointer rounded-lg bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
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

                      Creating account...
                    </>
                  ) : (
                    "Create account"
                  )}
                </button>
              </form>

              {/* Sign in */}
              <p className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="font-semibold text-violet-600 transition hover:text-violet-700"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Footer note */}
            <p className="mt-5 text-center text-xs leading-5 text-gray-400">
              By creating an account, you agree to our Terms of Service
              and Privacy Policy.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
