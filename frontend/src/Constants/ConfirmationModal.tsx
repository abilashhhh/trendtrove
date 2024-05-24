import React from "react";
import Modal from "react-modal";

interface ConfirmationModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onRequestClose,
  onConfirm,
  message,
}) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal" overlayClassName="overlay">
      <div className="p-6">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button onClick={onRequestClose} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-blue-500 text-white rounded">Confirm</button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
