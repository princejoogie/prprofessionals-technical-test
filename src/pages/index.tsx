import { type NextPage } from "next";
import Head from "next/head";
import { Calculator } from "~/components/calculator";
import { Container } from "~/components/container";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>PRProfessionals Technical Exam</title>
        <meta
          name="description"
          content="Technical exam for PRProfessionals"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Calculator />
      </Container>
    </>
  );
};

export default Home;
