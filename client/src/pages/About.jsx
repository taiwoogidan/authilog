import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function About() {
  const features = [
    {
      title: "Secure authentication",
      description:
        "A clean authentication experience designed around secure account access and session management.",
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
    {
      title: "Email verification",
      description:
        "Verify new accounts with a secure one-time code before granting access to protected areas.",
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
      title: "Protected sessions",
      description:
        "Authenticated sessions are designed to keep protected user areas accessible only to authorized users.",
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
            d="M12 3.75 5.25 6v5.25c0 4.43 2.81 8.34 6.75 9.75 3.94-1.41 6.75-5.32 6.75-9.75V6L12 3.75Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9.75 12 1.5 1.5 3-3"
          />
        </svg>
      ),
    },
  ];

  const principles = [
    {
      number: "01",
      title: "Security first",
      description:
        "Account security is treated as a fundamental part of the experience, not an afterthought.",
    },
    {
      number: "02",
      title: "Simple by design",
      description:
        "Authentication should be easy to understand and straightforward to use without unnecessary friction.",
    },
    {
      number: "03",
      title: "Built to grow",
      description:
        "The architecture is designed with room for additional features and more advanced account management.",
    },
  ];

  return (
    <>
      <Header />

      <main className="bg-white">

        {/* Hero */}
        <section className="relative overflow-hidden bg-gray-50 px-5 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-violet-100/70 blur-3xl" />
          <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-violet-100/50 blur-3xl" />

          <div className="relative mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
              About Authilog
            </span>

            <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Authentication should be{" "}
              <span className="text-violet-600">
                simple and secure.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              Authilog is a modern authentication platform built
              around a simple idea: giving users a secure and
              straightforward way to create, verify, and access
              their accounts.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="rounded-lg bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              >
                Create an account
              </Link>

              <Link
                to="/"
                className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              >
                Back to home
              </Link>
            </div>
          </div>
        </section>

        {/* What is Authilog */}
        <section className="px-5 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center">

            <div>
              <span className="text-sm font-semibold text-violet-600">
                WHAT IS AUTHILOG?
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                A better foundation for user accounts.
              </h2>

              <p className="mt-5 text-base leading-7 text-gray-600">
                Authilog provides the core account experience
                users expect from a modern web application.
                From registration and email verification to
                secure sign-in and protected dashboards,
                everything is designed to work together as one
                consistent experience.
              </p>

              <p className="mt-4 text-base leading-7 text-gray-600">
                Instead of making authentication complicated,
                Authilog focuses on getting the fundamentals
                right while keeping the experience clean for
                the people using it.
              </p>
            </div>

            {/* Visual card */}
            <div className="relative">
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5 shadow-sm sm:p-6">

                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-600 font-bold text-white">
                      A
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-950">
                        Authilog
                      </p>

                      <p className="text-xs text-gray-400">
                        Secure account access
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="h-3 w-3/4 rounded-full bg-gray-100" />
                    <div className="h-3 w-1/2 rounded-full bg-gray-100" />

                    <div className="mt-5 rounded-lg border border-green-200 bg-green-50 px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                          ✓
                        </span>

                        <span className="text-sm font-medium text-green-700">
                          Account securely verified
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-gray-50 px-5 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">

            <div className="max-w-2xl">
              <span className="text-sm font-semibold text-violet-600">
                WHAT WE PROVIDE
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                Everything you need for a solid account experience.
              </h2>

              <p className="mt-4 text-base leading-7 text-gray-600">
                Authilog focuses on the authentication fundamentals
                that modern applications need.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
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

        {/* Principles */}
        <section className="px-5 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">

            <div className="text-center">
              <span className="text-sm font-semibold text-violet-600">
                OUR PRINCIPLES
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-950 sm:text-4xl">
                Built around the fundamentals.
              </h2>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-3">
              {principles.map((principle) => (
                <div key={principle.number}>
                  <span className="text-sm font-bold text-violet-600">
                    {principle.number}
                  </span>

                  <h3 className="mt-3 text-xl font-semibold text-gray-950">
                    {principle.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-5 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="overflow-hidden rounded-2xl bg-gray-950 px-6 py-12 text-center sm:px-10 sm:py-16">

              <div className="mx-auto max-w-2xl">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Ready to get started?
                </h2>

                <p className="mt-4 text-sm leading-6 text-gray-400 sm:text-base">
                  Create your Authilog account and experience
                  a simple, secure authentication flow.
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
