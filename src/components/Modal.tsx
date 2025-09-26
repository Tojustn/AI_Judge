import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 dark:bg-black/80">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-[500px] max-w-[90%] relative">
        {title && (
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
            {title}
          </h3>
        )}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
          aria-label="Close modal"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
