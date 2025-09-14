"use client";
import { useState } from "react";

const useModalActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const onToggleModal = () => setIsOpen(!isOpen);
  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);

  return { isOpen, onToggleModal, onOpenModal, onCloseModal };
};

export default useModalActions;
