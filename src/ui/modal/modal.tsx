import React, { createContext, useContext, ReactNode } from 'react';
import { cn } from '../../utils/utils';

// Типы для контекста
interface ModalContextType {
  closeModal: (modalType: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

// Пропсы для провайдера
interface ModalProviderProps {
  onClose: (modalType: string) => void;
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ onClose, children }) => {
  return (
    <ModalContext.Provider value={{ closeModal: onClose }}>
      {children}
    </ModalContext.Provider>
  );
};

interface ModalProps {
  modalType: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ modalType, title, isOpen, onClose, children, className}) => {
  if (!isOpen) return null;

  return (
    <ModalProvider onClose={() => onClose()}>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className={cn("bg-[#1A191D] p-6 rounded-[16px] shadow-lg w-full relative", className)}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">{title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 absolute top-[-20px] right-[-20px]"
            >
              ✕
            </button>
          </div>
          <div className="mb-4">
            {children}
          </div>
        </div>
      </div>
    </ModalProvider>
  );
};

export default Modal;