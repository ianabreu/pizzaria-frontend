import Head from "next/head";
import Modal from "react-modal";
import { Header, Container } from "@/components/layout";
import { Icons } from "@/constants/Icons";
import { Title } from "@/components/ui";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { OrderItem, OrderProps } from "@/components/layout/order-item";

interface PainelProps {
  orders: OrderProps[];
}
export default function PainelPage({ orders }: PainelProps) {
  Modal.setAppElement("#__next");

  function handleOpenModalView(id: string) {
    alert(id);
  }
  return (
    <>
      <Head>
        <title>Painel - Abreu Pizza</title>
      </Head>
      <>
        <Header />
        <Container>
          <div className="flex gap-4">
            <Title>Últimos pedidos</Title>
            <button type="button" className="text-secondary text-lg">
              {Icons["refresh"]}
            </button>
          </div>
          <article className="flex flex-col gap-4 mt-4">
            {orders.map((order) => (
              <OrderItem
                key={order.id}
                order={order}
                onClick={handleOpenModalView}
              />
            ))}
          </article>
        </Container>
      </>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (context) => {
  const api = setupAPIClient(context);
  const response = await api.get("/orders");

  return {
    props: {
      orders: response.data,
    },
  };
});
