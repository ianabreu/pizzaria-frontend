import Head from "next/head";
import Modal from "react-modal";
import { Header, Container } from "@/components/layout";
import { Icons } from "@/constants/Icons";
import { Title } from "@/components/ui";
import { canSSRAuth } from "@/utils/canSSRAuth";

export default function Admin() {
  Modal.setAppElement("#__next");

  return (
    <>
      <Head>
        <title>Painel - Abreu Pizza</title>
      </Head>
      <>
        <Header />
        <Container>
          <Title>Pedidos</Title>
          <button type="button">{Icons["refresh"]}</button>
        </Container>
      </>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (context) => {
  return {
    props: {},
  };
});
