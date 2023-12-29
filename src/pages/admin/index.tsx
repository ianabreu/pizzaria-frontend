import Head from "next/head";
import { canSSRAuth } from "@/utils/canSSRAuth";

export default function Admin() {
  return (
    <>
      <Head>
        <title>Abreu Pizza - Admin</title>
      </Head>
      <main
        className={`flex h-screen flex-col items-center justify-center p-6`}
      ></main>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (context) => {
  return {
    props: {},
  };
});
