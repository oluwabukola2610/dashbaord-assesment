import React from "react";
import { UserData } from "./users";

interface UserModalProps {
  user: UserData | null;
  onClose: () => void;
}

const UserModal: React.FC<UserModalProps> = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full flex justify-center flex-col md:max-w-lg mx-4 ">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-gray-100">
          User Details
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Name:</strong> {user.name ?? "N/A"}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Street:</strong> {user?.address?.street ?? "N/A"}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>Suite:</strong> {user?.address?.suite ?? "N/A"}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          <strong>zipcode:</strong> {user?.address?.zipcode ?? "N/A"}
        </p>
        {/* Close button */}
       <div className="flex flex-row items-end justify-end ">
       <button className="btn btn-sm mt-4 w-fit dark:text-white"  onClick={onClose}>
          Close
        </button>
       </div>
      </div>
    </div>
  );
};

export default UserModal;
