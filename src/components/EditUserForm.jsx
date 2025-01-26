import React, { useState, useEffect } from "react";

const EditUserForm = ({ user, onSubmit, onClose, isLoading }) => {
  const [editedUser, setEditedUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
    },
    company: {
      name: "",
      catchPhrase: "",
    },
  });

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("address")) {
      const addressField = name.split(".")[1];
      setEditedUser((prevUser) => ({
        ...prevUser,
        address: {
          ...prevUser.address,
          [addressField]: value,
        },
      }));
    } else if (name.includes("company")) {
      const companyField = name.split(".")[1];
      setEditedUser((prevUser) => ({
        ...prevUser,
        company: {
          ...prevUser.company,
          [companyField]: value,
        },
      }));
    } else {
      setEditedUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(editedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50 shadow-3xl">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl h-[90vh] overflow-y-auto p-8 space-y-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-600 hover:text-gray-800"
        >
          ✖
        </button>
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Edit User
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={editedUser.username}
              onChange={handleChange}
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={editedUser.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Website <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="website"
              name="website"
              value={editedUser.website}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                id="street"
                name="address.street"
                value={editedUser.address.street}
                onChange={handleChange}
                placeholder="Street"
                className="px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                id="suite"
                name="address.suite"
                value={editedUser.address.suite}
                onChange={handleChange}
                placeholder="Suite"
                className="px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                id="city"
                name="address.city"
                value={editedUser.address.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                id="zipcode"
                name="address.zipcode"
                value={editedUser.address.zipcode}
                onChange={handleChange}
                placeholder="Zipcode"
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                id="companyName"
                name="company.name"
                value={editedUser.company.name}
                onChange={handleChange}
                placeholder="Company Name"
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                id="companyCatchphrase"
                name="company.catchPhrase"
                value={editedUser.company.catchPhrase}
                onChange={handleChange}
                placeholder="Catchphrase"
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-lg transition duration-200 ease-in-out cursor-pointer 
        ${
          isLoading
            ? "bg-green-400 text-gray-200"
            : "bg-green-600 text-white hover:bg-green-700"
        }`}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;