import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Homepage() {
  return (
   <>
     <Header />
    <main className="min-h-screen bg-white text-gray-950">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-100/60 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-5 pb-20 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pb-28 lg:pt-32">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700">
              <span className="h-2 w-2 rounded-full bg-violet-600" />
              Simple. Secure. Built for you.
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-7xl">
              Everything you need,
              <span className="block text-violet-600">all in one place.</span>
            </h1>

            {/* Description */}
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg sm:leading-8">
              Authilog gives you a simple and secure space to manage your tasks,
              stay organized, and keep track of what matters most.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                to="/signup"
                className="rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              >
                Get started for free
              </Link>

              <Link
                to="/features"
                className="rounded-xl border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
              >
                Explore features
              </Link>
            </div>

            <p className="mt-5 text-xs text-gray-500">
              No complicated setup. Just create an account and get started.
            </p>
          </div>

          {/* Dashboard Preview */}
          <div className="mx-auto mt-16 max-w-5xl sm:mt-20">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 shadow-2xl shadow-gray-200/60">
              {/* Browser bar */}
              <div className="flex items-center gap-2 border-b border-gray-200 bg-white px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-gray-300" />
                <span className="h-3 w-3 rounded-full bg-gray-300" />
                <span className="h-3 w-3 rounded-full bg-gray-300" />

                <div className="ml-4 hidden h-7 flex-1 rounded-md bg-gray-100 sm:block" />
              </div>

              {/* Dashboard mockup */}
              <div className="grid min-h-[350px] grid-cols-1 md:grid-cols-[180px_1fr]">
                {/* Sidebar */}
                <aside className="hidden border-r border-gray-200 bg-white p-4 md:block">
                  <div className="mb-7 text-sm font-bold">authilog</div>

                  <div className="space-y-1">
                    <div className="rounded-lg bg-violet-50 px-3 py-2 text-xs font-semibold text-violet-600">
                      Dashboard
                    </div>

                    <div className="px-3 py-2 text-xs text-gray-500">Tasks</div>

                    <div className="px-3 py-2 text-xs text-gray-500">
                      Profile
                    </div>

                    <div className="px-3 py-2 text-xs text-gray-500">
                      Settings
                    </div>
                  </div>
                </aside>

                {/* Main dashboard */}
                <div className="bg-gray-50 p-5 sm:p-7">
                  <div className="mb-6">
                    <p className="text-xs text-gray-500">Welcome back</p>

                    <h2 className="mt-1 text-xl font-bold">Good morning 👋</h2>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    {[
                      ["Total tasks", "24"],
                      ["Completed", "16"],
                      ["Pending", "8"],
                      ["Progress", "67%"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-xl border border-gray-200 bg-white p-4"
                      >
                        <p className="text-xs text-gray-500">{label}</p>

                        <p className="mt-2 text-xl font-bold">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Tasks */}
                  <div className="mt-5 rounded-xl border border-gray-200 bg-white p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-sm font-semibold">Recent tasks</h3>

                      <span className="text-xs text-violet-600">View all</span>
                    </div>

                    <div className="space-y-3">
                      {[
                        ["Complete project", "Completed"],
                        ["Review documentation", "Pending"],
                        ["Plan next week", "Pending"],
                      ].map(([task, status]) => (
                        <div
                          key={task}
                          className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-3"
                        >
                          <span className="text-xs font-medium text-gray-700">
                            {task}
                          </span>

                          <span
                            className={`text-[10px] font-semibold ${
                              status === "Completed"
                                ? "text-green-600"
                                : "text-amber-600"
                            }`}
                          >
                            {status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= VALUE ================= */}
      <section className="border-y border-gray-100 bg-gray-50/70">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-violet-600">
              WHY AUTHILOG
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Built to keep things simple
            </h2>

            <p className="mt-4 text-gray-600">
              No unnecessary complexity. Authilog gives you the tools you need
              without getting in your way.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
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
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036a11.959 11.959 0 0 1 8.716 3.63 11.959 11.959 0 0 1 0 10.312A11.959 11.959 0 0 1 12 20.286a11.959 11.959 0 0 1-8.716-3.63 11.959 11.959 0 0 1 0-10.312A11.959 11.959 0 0 1 12 2.714Z"
                  />
                </svg>
              </div>

              <h3 className="mt-5 text-lg font-semibold">Simple to use</h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                A clean and intuitive experience that lets you focus on getting
                things done.
              </p>
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
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
                    d="M16.5 10.5V6.75a4.5 4.5 0 0 0-9 0v3.75m-.75 0h10.5A1.75 1.75 0 0 1 19 12.25v7A1.75 1.75 0 0 1 17.25 21H6.75A1.75 1.75 0 0 1 5 19.25v-7A1.75 1.75 0 0 1 6.75 10.5Z"
                  />
                </svg>
              </div>

              <h3 className="mt-5 text-lg font-semibold">Secure by design</h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Your account and personal data are protected with modern
                authentication practices.
              </p>
            </div>

            {/* Card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
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
                    d="M3.75 13.5 9 3.75v6h11.25L15 20.25v-6H3.75Z"
                  />
                </svg>
              </div>

              <h3 className="mt-5 text-lg font-semibold">Stay productive</h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Organize your work, track your progress, and keep everything
                important in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold text-violet-600">
              HOW IT WORKS
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Get started in minutes
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-10 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 font-bold text-white">
                1
              </div>

              <h3 className="mt-5 font-semibold">Create your account</h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Sign up with your email and create your secure account.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 font-bold text-white">
                2
              </div>

              <h3 className="mt-5 font-semibold">Verify your email</h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Confirm your email address to activate your account.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 font-bold text-white">
                3
              </div>

              <h3 className="mt-5 font-semibold">Start managing</h3>

              <p className="mt-2 text-sm leading-6 text-gray-600">
                Access your dashboard and start organizing your work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gray-950 px-6 py-16 text-center sm:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to get organized?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
            Create your Authilog account and start managing everything that
            matters to you.
          </p>

          <Link
            to="/signup"
            className="mt-8 inline-flex rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-gray-950"
          >
            Create your free account
          </Link>
        </div>
      </section>
    </main>
   </>
  );
}
