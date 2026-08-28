import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Features() {
  const features = [
    {
      title: "Easy account creation",
      description:
        "Create an Authilog account with a simple registration process designed to collect only the information you need.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.25a8.25 8.25 0 0 1 16.5 0"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25v5.25m2.625-2.625h-5.25"
          />
        </svg>
      ),
    },
    {
      title: "Email verification",
      description:
        "Verify your email address with a time-limited one-time code before accessing protected account features.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.75 6.75v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615A2.25 2.25 0 0 1 2.25 6.993V6.75"
          />
        </svg>
      ),
    },
    {
      title: "Secure sign in",
      description:
        "Sign in securely and access your account without exposing authentication tokens to client-side JavaScript.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v16.5H13.5a2.25 2.25 0 0 0 2.25-2.25V15"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 12H9m0 0 3-3m-3 3 3 3"
          />
        </svg>
      ),
    },
    {
      title: "Protected dashboard",
      description:
        "Authenticated users get access to a private dashboard while unauthorized users are kept away from protected resources.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75A2.25 2.25 0 0 1 6 4.5h12a2.25 2.25 0 0 1 2.25 2.25v10.5A2.25 2.25 0 0 1 18 19.5H6a2.25 2.25 0 0 1-2.25-2.25V6.75Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 9h16.5"
          />
        </svg>
      ),
    },
    {
      title: "Session management",
      description:
        "Keep authenticated sessions under control with secure access and refresh-token based session handling.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6l4 2"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
    },
    {
      title: "Password security",
      description:
        "Strong password requirements help users create credentials that are more resistant to common password attacks.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 0h10.5A1.75 1.75 0 0 1 19 12.25v7A1.75 1.75 0 0 1 17.25 21H6.75A1.75 1.75 0 0 1 5 19.25v-7A1.75 1.75 0 0 1 6.75 10.5Z"
          />
        </svg>
      ),
    },
  ];

  const securityFeatures = [
    {
      title: "HTTP-only cookies",
      description:
        "Authentication cookies can be configured so they aren't accessible through client-side JavaScript.",
    },
    {
      title: "Short-lived access",
      description:
        "Short-lived access tokens reduce the impact of an exposed access credential.",
    },
    {
      title: "Refresh-token sessions",
      description:
        "Longer-lived sessions can be maintained through refresh tokens without keeping access tokens around indefinitely.",
    },
    {
      title: "Email ownership",
      description:
        "Email verification helps establish that users have access to the email address associated with their account.",
    },
  ];

  return (
    <>
      <Header />

      <main className="bg-white">

        {/* Hero */}
        <section className="relative overflow-hidden bg-gray-50 px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-violet-100/70 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-violet-100/60 blur-3xl" />

          <div className="relative mx-auto max-w-4xl text-center">

            <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
              Authilog Features
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Everything you need for{" "}
              <span className="text-violet-600">
                secure authentication.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              From creating an account to managing an authenticated
              session, Authilog brings the essential pieces of a
              modern authentication experience together.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              >
                Get started
              </Link>

              <Link
                to="/about"
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                Learn about Authilog
              </Link>
            </div>
          </div>
        </section>

        {/* Main Features */}
        <section className="px-5 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">

            <div className="max-w-2xl">
              <span className="text-sm font-semibold text-violet-600">
                CORE FEATURES
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                A complete authentication experience.
              </h2>

              <p className="mt-4 text-base leading-7 text-gray-600">
                Authilog covers the important stages of a user's
                account journey without adding unnecessary complexity.
              </p>
            </div>

            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-violet-200 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
                    {feature.icon}
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-gray-950">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Section */}
        <section className="bg-gray-50 px-5 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">

            {/* Text */}
            <div>
              <span className="text-sm font-semibold text-violet-600">
                SECURITY
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                Security is part of the architecture.
              </h2>

              <p className="mt-5 text-base leading-7 text-gray-600">
                Authentication isn't just about creating a login
                form. A reliable system needs to protect credentials,
                manage sessions, verify account ownership, and control
                access to protected resources.
              </p>

              <div className="mt-8">
                <Link
                  to="/signup"
                  className="inline-flex rounded-lg bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Try Authilog
                </Link>
              </div>
            </div>

            {/* Security cards */}
            <div className="grid gap-4 sm:grid-cols-2">
              {securityFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
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
                        d="M12 3.75 5.25 6v5.25c0 4.43 2.81 8.34 6.75 9.75 3.94-1.41 6.75-5.32 6.75-9.75V6L12 3.75Z"
                      />
                    </svg>
                  </div>

                  <h3 className="text-sm font-semibold text-gray-950">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-gray-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-5 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">

            <div className="text-center">
              <span className="text-sm font-semibold text-violet-600">
                HOW IT WORKS
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                From signup to secure access.
              </h2>
            </div>

            <div className="relative mt-12 grid gap-8 md:grid-cols-4">

              {[
                {
                  number: "01",
                  title: "Create account",
                  description:
                    "Provide your basic details and create a strong password.",
                },
                {
                  number: "02",
                  title: "Verify email",
                  description:
                    "Confirm ownership of your email using a verification code.",
                },
                {
                  number: "03",
                  title: "Sign in",
                  description:
                    "Authenticate with your verified account credentials.",
                },
                {
                  number: "04",
                  title: "Access dashboard",
                  description:
                    "Enter your protected account area and manage your profile.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="relative text-center md:text-left"
                >
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white md:mx-0">
                    {step.number}
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-gray-950">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">

            <div className="relative overflow-hidden rounded-2xl bg-gray-950 px-6 py-14 text-center sm:px-10">

              <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-violet-600/20 blur-3xl" />

              <div className="relative mx-auto max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Experience Authilog for yourself.
                </h2>

                <p className="mt-4 text-sm leading-6 text-gray-400 sm:text-base">
                  Create an account and go through the complete
                  authentication experience from signup to dashboard.
                </p>

                <div className="mt-8">
                  <Link
                    to="/signup"
                    className="inline-flex rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-950"
                  >
                    Create your account
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
    </>
  );
}
