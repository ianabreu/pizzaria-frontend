import { Header } from "@/components/layout/Header";
import { canSSRAuth } from "@/utils/canSSRAuth";
import Head from "next/head";
import Modal from "react-modal";

export default function Admin() {
  Modal.setAppElement("#__next");

  return (
    <>
      <Head>
        <title>Painel - Abreu Pizza</title>
      </Head>
      <main className={`flex `}>
        <Header />
      </main>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (context) => {
  return {
    props: {},
  };
});
