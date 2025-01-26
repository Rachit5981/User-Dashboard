import React from "react";

const Card = ({ user, onEdit, onDelete, isDeleting }) => {
  return (
    <div
      key={user.id}
      className="w-full bg-white shadow-lg rounded-xl border border-gray-200 p-6 hover:shadow-2xl transition duration-200 ease-in-out"
    >
      <div className="flex items-center space-x-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
        </div>
      </div>
      <div className="mt-4">
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-gray-400">Username</p>
            <p className="text-gray-700">{user.username}</p>
          </div>
          <div>
            <p className="text-gray-400">Email</p>
            <p className="text-gray-700">{user.email}</p>
          </div>
          <div>
            <p className="text-gray-400">Phone</p>
            <p className="text-gray-700">{user.phone}</p>
          </div>
          <div>
            <p className="text-gray-400">Website</p>
            <p className="text-gray-700">{user.website}</p>
          </div>
        </div>
        <hr className="my-4" />
        <div>
          <p className="text-gray-400">Address</p>
          <p className="text-gray-700">
            {user.address.street}, {user.address.suite}, {user.address.city},{" "}
            {user.address.zipcode}
          </p>
        </div>
        <hr className="my-4" />
        <div>
          <p className="text-gray-400">Company</p>
          <p className="text-gray-700 font-medium">{user.company.name}</p>
          <p className="text-gray-500 text-sm">{user.company.catchPhrase}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => onEdit(user)}
          className="bg-blue-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out cursor-pointer"
        >
          Edit User
        </button>
        <button
          onClick={() => onDelete(user.id)}
          disabled={isDeleting}
          className={`text-white text-sm px-4 py-2 rounded-lg transition duration-200 ease-in-out 
          ${
            isDeleting
              ? "bg-red-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600 cursor-pointer"
          }`}
        >
          {isDeleting ? "Deleting..." : "Delete User"}
        </button>
      </div>
    </div>
  );
};

export default Card;