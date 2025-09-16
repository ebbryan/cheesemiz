"use client";
import { useState } from "react";

export interface IUseModalActions {
  isOpen: boolean;
  onToggleModal: () => void;
  onOpenModal: () => void;
  onCloseModal: () => void;
}

const useModalActions = (): IUseModalActions => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggleModal = () => setIsOpen((prev) => !prev);
  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

  return { isOpen, onToggleModal, onOpenModal, onCloseModal };
};

export default useModalActions;
