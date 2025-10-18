import React from "react";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

export default function FormModal({ isOpen, onClose, title, children }) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      center
      classNames={{
        modal: "rounded-2xl p-6 max-w-lg w-full shadow-xl",
      }}
    >
      <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
      <div>{children}</div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}
