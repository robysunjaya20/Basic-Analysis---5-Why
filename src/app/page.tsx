import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Basic Analysis
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          5 Why Analysis
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Silakan pilih jenis test yang ingin dikerjakan.
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link
            href="/pretest"
            className="rounded-xl bg-blue-600 px-5 py-4 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Pre-Test
          </Link>

          <Link
            href="/posttest"
            className="rounded-xl border border-slate-300 bg-white px-5 py-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Post-Test
          </Link>
        </div>
      </div>
    </main>
  );
}