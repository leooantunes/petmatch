import React, { createContext, useContext, useState } from "react";

export type ModalVariant = "success" | "error" | "info" | "warning";

export interface ModalConfig {
  title: string;
  message: string;
  variant: ModalVariant;
  confirmText?: string;
  cancelText?: string;
  showCancelButton?: boolean;
  onConfirm?: () => void;
}

export interface ModalContextType {
  isVisible: boolean;
  config: ModalConfig | null;
  showModal: (config: ModalConfig) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [config, setConfig] = useState<ModalConfig | null>(null);

  const showModal = (newConfig: ModalConfig) => {
    setConfig(newConfig);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
    setConfig(null);
  };

  return (
    <ModalContext.Provider value={{ isVisible, config, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal deve ser usado dentro de ModalProvider");
  }
  return context;
};
