import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  users: { _id: string; username: string }[];
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, users }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h3>
          <button onClick={onClose} className="text-gray-800 dark:text-white">X</button>
        </div>
        <div>
          {users.length > 0 ? (
            <ul>
              {users.map(user => (
                <li key={user._id} className="py-2 border-b border-gray-300">
                  {user.username}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-800 dark:text-white">No users found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
