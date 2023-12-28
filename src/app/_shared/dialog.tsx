import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

interface IDialogTitleProps {
  children?: ReactNode;
}
interface IDialogContentProps {
  children?: ReactNode;
}
interface IDialogMainProps {
  children?: ReactNode;
  isOpen: boolean;
}

const ModalWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 100;
`;

const ModalDimmed = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: #2525257d;
`;
const Modal = styled.div`
  width: 95%;
  border-radius: 20px;
  overflow: hidden;
`;

const DialogTitle = ({ children }: IDialogTitleProps) => {
  return <div>{children}</div>;
};

const DialogDimmed = () => {
  return <ModalDimmed></ModalDimmed>;
};

const DialogMain = ({ children, isOpen }: IDialogMainProps) => {
  const modalRoot = document.getElementById("appInner");
  if (!modalRoot) {
    return null;
  }

  if (!isOpen) {
    return null;
  }
  return createPortal(<ModalWrap>{children}</ModalWrap>, modalRoot);
};

const DialogContent = ({ children, ...props }: IDialogContentProps) => {
  return <Modal>{children}</Modal>;
};

export const Dialog = Object.assign(DialogMain, {
  Title: DialogTitle,
  Content: DialogContent,
  Dimmed: DialogDimmed,
});

export const AddressDialog = ({ children, ...props }: IDialogMainProps) => (
  <Dialog isOpen={false}>
    <Dialog.Dimmed />
    <Dialog.Content {...props}>
      <Dialog.Title>Offer</Dialog.Title>
      {children}
    </Dialog.Content>
  </Dialog>
);
