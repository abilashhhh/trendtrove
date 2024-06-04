import React, { useEffect, useState } from "react";
import { getAllUsers } from "../API/User/user";
import { StoreType } from '../Redux/Store/reduxStore';
import { useSelector } from "react-redux";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title }) => {
  const [users, setUsers] = useState<{ _id: string; username: string; dp: string }[]>([]);
  const currentUser = useSelector((state: StoreType) => state.userAuth.user);
  const userId = currentUser?._id;

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const { status, message, user } = await getAllUsers();
        if (status === "success") {
          setUsers(user);
        } else {
          console.error("Failed to fetch users:", message);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    if (isOpen) {
      fetchAllUsers();
    }
  }, [isOpen, userId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-300 pb-3 mb-3">
          <h3 className="text-lg font-semibold max-w-full text-gray-800 bg-red-600 p-3 rounded dark:text-white">{title}</h3>
          <h3 className="text-lg font-semibold  text-gray-800 bg-slate-600 p-3 rounded dark:text-white">{users.length} { title}</h3>
          <button onClick={onClose} className="text-gray-800 dark:text-white">X</button>
        </div>
        <div>
          {users.length > 0 ? (
            <ul>
              {users.map(user => (
                <li key={user._id} className="flex items-center py-2 border-b border-gray-300">
                  <img src={user.dp} alt={user.username} className="w-8 h-8 rounded-full mr-2" />
                  <span>{user.username}</span>
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
