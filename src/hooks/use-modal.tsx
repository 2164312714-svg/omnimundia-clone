"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { ModalName } from "@/lib/types";

interface ModalContextValue {
  activeModal: ModalName | null;
  showModal: (name: ModalName) => void;
  closeModal: () => void;
  closeAll: () => void;
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalName | null>(null);

  const showModal = (name: ModalName) => setActiveModal(name);
  const closeModal = () => setActiveModal(null);
  const closeAll = () => setActiveModal(null);

  return (
    <ModalContext.Provider value={{ activeModal, showModal, closeModal, closeAll }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
}
