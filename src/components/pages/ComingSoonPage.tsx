import Link from "next/link";

type ComingSoonPageProps = {
  title: string;
  description: string;
};

export const ComingSoonPage = ({ title, description }: ComingSoonPageProps) => {
  return (
    <main className="relative min-h-[100svh] overflow-x-hidden bg-[#0e152e] px-6 pb-16 pt-28 text-white sm:px-8 md:px-10">
      <div className="mx-auto flex min-h-[calc(100svh-9rem)] w-full max-w-4xl items-center">
        <div className="rounded-2xl border border-white/15 bg-white/5 p-8 backdrop-blur-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Midline Airlines</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base text-white/80 sm:text-lg">{description}</p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex rounded-full bg-[#036190] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#024c73]"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

