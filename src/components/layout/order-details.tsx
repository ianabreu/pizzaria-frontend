import Modal, { Styles } from "react-modal";
import { OrderItemProps } from "../../pages/painel";
import { Icons } from "../../constants/Icons";
import { Title } from "../ui/title";
import { UIButton } from "../ui/button";

interface OrderItemDetailsProps {
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderItemProps[];
  handleFinishOrder: (order_id: string) => void;
}

export function OrderItemDetails({
  isOpen,
  onRequestClose,
  order,
  handleFinishOrder,
}: OrderItemDetailsProps) {
  const customStyles: Styles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      minWidth: "60vw",
      maxWidth: "90vw",
      padding: "2rem",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "var(--dark-700)",
    },
    overlay: {
      backgroundColor: "rgba(0,0,0,0.5)",
    },
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <div className="flex items-start gap-4 justify-between mb-4 select-none">
        <Title>Detalhes do pedido</Title>
        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close text-primary text-3xl"
        >
          {Icons["close"]}
        </button>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex flex-col">
          <span className="text-base">
            Mesa: <strong>{order[0].order.table}</strong>
          </span>
          <span className="text-base">
            {order[0].order.name && `Nome: ${order[0].order.name}`}
          </span>
        </div>
        {order.map((order) => (
          <section key={order.id} className="flex flex-col">
            <span>
              {order.amount}x - <strong>{order.product.name}</strong>
            </span>
            <span className="text-sm break-all sm:max-w-2xl opacity-75">
              {order.product.description}
            </span>
          </section>
        ))}
      </div>
      <div className="max-w-xs">
        <UIButton
          variant="secondary"
          onClick={() => handleFinishOrder(order[0].order_id)}
        >
          Concluir pedido
        </UIButton>
      </div>
    </Modal>
  );
}
