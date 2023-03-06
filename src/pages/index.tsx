import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { Calculator } from "~/components/calculator";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>PRPProfessionals Technical Exam</title>
        <meta
          name="description"
          content="Technical exam for PRPProfessionals"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col px-2">
        <AuthNavbar />
        <div className="mx-auto mt-4 flex w-full max-w-3xl flex-1 flex-col rounded-t-3xl bg-primary-500">
          {sessionData ? (
            <Calculator />
          ) : (
            <div className="mt-10 grid place-items-center">
              <p className="text-3xl">Sign in to continue</p>
              <p className="text-primary-100">only username is required</p>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

const AuthNavbar: React.FC = () => {
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
};

export default Home;
