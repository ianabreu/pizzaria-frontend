import Modal, { Styles } from "react-modal";
import { Icons } from "../../constants/Icons";
import { UIButton } from "./button-ui";

const customStyles: Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
};
interface DialogConfig {
  isOpen: boolean;
  openModal: (isOpen: boolean) => void;
  title: string;
  message: string;
  confirmButtonText?: string;
  showCancelButton?: boolean;
}

export function Dialog(
  {
    isOpen,
    openModal,
    title,
    message,
    confirmButtonText = "Ok",
    showCancelButton = false,
  }: DialogConfig,
  onConfirm: () => void
) {
  function handleCloseModal() {
    openModal(false);
  }

  return (
    <Modal
      isOpen={isOpen}
      style={customStyles}
      preventScroll={true}
      onRequestClose={handleCloseModal}
    >
      <div className="text-background flex flex-col items-center justify-between gap-4 m-0">
        <span className="text-primary text-8xl ">{Icons["alert"]}</span>
        <h6 className="font-bold text-3xl">{title}</h6>
        <p className="text-base">{message}</p>
        <div className="flex w-full justify-around">
          {showCancelButton && (
            <UIButton onClick={handleCloseModal} variant="cancel">
              Cancelar
            </UIButton>
          )}
          <UIButton onClick={onConfirm}>{confirmButtonText}</UIButton>
        </div>
      </div>
    </Modal>
  );
}
