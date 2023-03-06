import { type ReactNode } from "react";
import { useSession } from "next-auth/react";

import { Navbar } from "./navbar";

export interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  const { data: sessionData, status } = useSession();

  if (status === "loading") {
    return (
      <main className="flex h-screen flex-col px-2">
        <Navbar />
        <div className="mx-auto mt-4 flex w-full max-w-3xl flex-1 flex-col overflow-y-auto rounded-t-3xl bg-primary-500">
          <div className="mt-10 grid place-items-center">
            <p className="text-3xl">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-screen flex-col px-2">
      <Navbar />
      <div className="mx-auto mt-4 flex w-full max-w-3xl flex-1 flex-col overflow-y-auto rounded-t-3xl bg-primary-500">
        {sessionData ? (
          children
        ) : (
          <div className="mt-10 grid place-items-center">
            <p className="text-3xl">Sign in to continue</p>
            <p className="text-primary-100">only username is required</p>
          </div>
        )}
      </div>
    </main>
  );
};
