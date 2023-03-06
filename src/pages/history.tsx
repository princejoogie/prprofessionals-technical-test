import { type NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { useSession } from "next-auth/react";

import { Container } from "~/components/container";
import { api } from "~/utils/api";

const History: NextPage = () => {
  const { data: session } = useSession();

  const history = api.calculations.getAll.useQuery(undefined, {
    enabled: !!session,
  });

  const clearHistory = api.calculations.clear.useMutation({
    onSuccess: () => history.refetch(),
  });

  return (
    <>
      <Head>
        <title>PRPProfessionals Technical Exam | History</title>
        <meta
          name="description"
          content="Technical exam for PRPProfessionals | History"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <div className="flex flex-col">
          <div className="flex items-center justify-evenly px-6 py-10">
            <Link href="/" replace>
              <p>Back</p>
            </Link>

            <h3 className="flex-1 text-center text-4xl font-semibold">
              History
            </h3>

            <button onClick={() => clearHistory.mutate()}>Clear</button>
          </div>
        </div>

        <div className="hide-scrollbar mx-6 mt-2 overflow-y-auto rounded-3xl bg-primary-400">
          {history.isLoading ? (
            <p className="px-6 py-10 text-center text-xl font-semibold">
              <span className="block">Loading...</span>
            </p>
          ) : history.data && history.data.length > 0 ? (
            history.data.map((e) => (
              <div
                key={e.id}
                className="border-b-2 border-primary-500 p-6 text-xl font-semibold"
              >
                <p>{e.expression}</p>
                <p>={e.result}</p>
              </div>
            ))
          ) : (
            <p className="px-6 py-10 text-center text-xl font-semibold">
              <span className="block">Empty!</span>
              <span>Do some calculations</span>
            </p>
          )}
        </div>
      </Container>
    </>
  );
};

export default History;
