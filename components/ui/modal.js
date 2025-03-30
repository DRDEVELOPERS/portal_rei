// app/components/ui/Modal.js
"use client";

import { useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function Modal({ isOpen, onClose, title, message, onConfirm }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate__animated animate__fadeIn">
      <div className="bg-white dark:bg-primary-black rounded-xl p-6 w-full max-w-md relative border-2 border-primary-yellow/30">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-primary-black dark:text-primary-yellow hover:text-primary-yellow transition-colors"
        >
          <FiX className="w-6 h-6" />
        </button>

        <h3 className="text-2xl font-bold text-primary-black dark:text-primary-yellow mb-4">
          {title}
        </h3>

        <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>

        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg border-2 border-primary-yellow/30 text-primary-black dark:text-gray-300 hover:bg-primary-yellow/10 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-6 py-2 rounded-lg bg-primary-yellow text-primary-black hover:bg-[#f8d634] transition-colors font-semibold"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
