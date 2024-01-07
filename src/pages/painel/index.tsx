import { useState } from "react";
import Head from "next/head";
import Modal from "react-modal";
import { Header } from "../../components/layout/header";
import { Container } from "../../components/layout/container";
import { OrderItem, OrderProps } from "../../components/layout/order-item";
import { Icons } from "../../constants/Icons";
import { Title } from "../../components/ui/title";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";
import { api } from "../../services/apiClient";
import { OrderItemDetails } from "../../components/layout/order-details";

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
  const [orderList, setOrderList] = useState<OrderProps[]>(orders);
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

  async function handleFinishItem(order_id: string) {
    api.put("/order/finish", { order_id });
    const { data } = await api.get("/orders");
    setOrderList(data);
    setModalVisible(false);
  }
  async function handleRefreshOrders() {
    const { data } = await api.get("/orders");
    setOrderList(data);
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
          <button
            type="button"
            className="text-secondary text-lg"
            onClick={handleRefreshOrders}
          >
            {Icons["refresh"]}
          </button>
        </div>
        <article className="flex flex-col gap-4 mt-4">
          {orderList.length === 0 && (
            <div className="text-xl text-center opacity-75">
              Nenhum pedido aberto encontrado!
            </div>
          )}
          {orderList.map((order) => (
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
          handleFinishOrder={handleFinishItem}
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
