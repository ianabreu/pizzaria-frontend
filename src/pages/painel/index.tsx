import Head from "next/head";
import Modal from "react-modal";
import { Header, Container, OrderItem, OrderProps } from "@/components/layout";
import { Icons } from "@/constants/Icons";
import { Title } from "@/components/ui";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { setupAPIClient } from "@/services/api";
import { useState } from "react";
import { api } from "@/services/apiClient";
import { OrderItemDetails } from "@/components/layout/order-details";

interface PainelProps {
  orders: OrderProps[];
}
export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    banner: string;
    category_id: string;
  };
  order: {
    id: string;
    table: number;
    status: boolean;
    draft: boolean;
    name: string | null;
  };
};
export default function PainelPage({ orders }: PainelProps) {
  Modal.setAppElement("#__next");
  const [modalItem, setModalItem] = useState<OrderItemProps[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  function handleCloseModal() {
    setModalVisible(false);
  }
  async function handleOpenModalView(id: string) {
    const response = await api.get("/order/detail", {
      params: { order_id: id },
    });
    setModalItem(response.data);
    setModalVisible(true);
  }
  return (
    <>
      <Head>
        <title>Painel - Abreu Pizza</title>
      </Head>

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
      {modalVisible && (
        <OrderItemDetails
          isOpen={modalVisible}
          onRequestClose={handleCloseModal}
          order={modalItem}
        />
      )}
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
