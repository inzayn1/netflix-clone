"use client";

import { MovieSearch } from "@/components/custom/actions";
import { CUser } from "@/components/custom/cards";
import { Button } from "@/components/ui/button";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import ThemeToggle from "@/components/ui/theme-toggle";
import { Toaster } from "@/components/ui/toaster";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { Fragment } from "react";

type Props = {
  children: Readonly<React.ReactNode>;
};

const Template = ({ children }: Props) => {
  const { data } = useSession();

  return (
    <div className="bg-stone-50 dark:bg-black h-full w-full min-h-screen text-stone-900 dark:text-white">
      <ScrollProgress />

      <header className="mx-auto z-50 bg-stone-50/40 dark:bg-black/40 backdrop-blur-lg px-6 py-4 rounded-xl container flex items-center flex-nowrap justify-between relative">
        <Link
          href="/"
          className="font-bold text-red-600 dark:text-white text-lg uppercase"
        >
          nefflix
        </Link>

        {!!data?.session ? (
          <div className="text-sm font-medium flex justify-between gap-10 items-center transition-all duration-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link
              className="transition-all duration-500 text-stone-500 hover:text-stone-950"
              href="/dashboard"
            >
              Home
            </Link>
            <Link
              className="transition-all duration-500 text-stone-500 hover:text-stone-950"
              href="/dashboard?t=cartoon"
            >
              Cartoon
            </Link>
            <Link
              className="transition-all duration-500 text-stone-500 hover:text-stone-950"
              href="/dashboard?t=movie"
            >
              Movies
            </Link>
          </div>
        ) : null}

        <div className="flex items-center gap-2.5">
          {!!data?.session && <MovieSearch />}
          <ThemeToggle />

          {!!data?.session ? (
            <CUser />
          ) : (
            <Fragment>
              <Button size="sm" variant="secondary" href="/auth/signin">
                Sign in
              </Button>
              <Button size="sm" href="/auth/signup">
                Sign up
              </Button>
            </Fragment>
          )}
        </div>
      </header>
      {children}

      <Toaster />
    </div>
  );
};

export default Template;
