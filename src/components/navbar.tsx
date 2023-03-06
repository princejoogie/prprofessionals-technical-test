import { signIn, signOut, useSession } from "next-auth/react";

export const Navbar = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="mx-auto mt-4 flex w-full max-w-3xl items-center justify-between p-4">
      <p className="text-center text-2xl">
        {sessionData && <span>Hey, {sessionData.user?.username}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
