import { useState, useEffect } from "react";
import Card from "../components/Card";
import CreateUserForm from "../components/CreateUserForm";
import EditUserForm from "../components/EditUserForm";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", username: "", email: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [notification, setNotification] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState({
    create: false,
    edit: false,
    delete: null,
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleCreateUser = (user) => {
    setIsLoading((prev) => ({ ...prev, create: true }));
    const tempId = Date.now();
    const userWithTempId = { ...user, id: tempId };
    console.log(tempId);

    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(user),
    })
      .then((response) => response.json())
      .then((data) => {
        const finalUser = { ...userWithTempId, id: data.id || tempId };
        setUsers([...users, finalUser]);
        setShowCreateForm(false);
        showNotification("User created!", "success");
      })
      .catch((error) => {
        setUsers([...users, userWithTempId]);
        setShowCreateForm(false);
        console.error("Error adding user:", error);
        showNotification("User created locally", "success");
      })
      .finally(() => {
        setIsLoading((prev) => ({ ...prev, create: false }));
      });
  };

  const handleEditUser = (updatedUser) => {
    setIsLoading((prev) => ({ ...prev, edit: true }));

    const isLocalUser =
      typeof editingUser.id === "number" && editingUser.id > 10000;

    const updatedUsers = users.map((user) =>
      user.id === editingUser.id ? { ...updatedUser, id: editingUser.id } : user
    );

    if (!isLocalUser) {
      fetch(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error editing user:", error);
        });
    }

    setUsers(updatedUsers);
    setShowEditForm(false);
    setEditingUser(null);
    showNotification("User updated!", "success");
    setIsLoading((prev) => ({ ...prev, edit: false }));
  };

  const handleDeleteUser = (userId) => {
    setIsLoading((prev) => ({ ...prev, delete: userId }));
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
      method: "DELETE",
    })
      .then(() => {
        setUsers(users.filter((user) => user.id !== userId));
        showNotification("User deleted!", "error");
      })
      .catch((error) => console.error("Error deleting user:", error))
      .finally(() => {
        setIsLoading((prev) => ({ ...prev, delete: null }));
      });
  };

  const showNotification = (message, type) => {
    setNotification(message);
    setNotificationType(type);

    setTimeout(() => {
      setNotification("");
      setNotificationType("");
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div
        className={`flex justify-between items-center px-8 py-4 bg-indigo-600 text-white ${
          showCreateForm || showEditForm ? "opacity-50" : "opacity-100"
        }`}
      >
        <h1 className="text-3xl font-bold">User Management Dashboard</h1>
        <button
          className="bg-green-500 text-white text-lg px-4 py-2 font-bold rounded-lg hover:bg-green-600 transition duration-200 ease-in-out cursor-pointer"
          onClick={() => {
            setCurrentUser(null);
            setNewUser({ name: "", username: "", email: "" });
            setShowCreateForm(true);
          }}
        >
          Create User +
        </button>
      </div>

      {showCreateForm && (
        <CreateUserForm
          onSubmit={handleCreateUser}
          onClose={() => setShowCreateForm(false)}
          isLoading={isLoading.create}
        />
      )}

      {showEditForm && editingUser && (
        <EditUserForm
          user={editingUser}
          onSubmit={handleEditUser}
          onClose={() => {
            setShowEditForm(false);
            setEditingUser(null);
          }}
          isLoading={isLoading.edit}
        />
      )}

      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 py-6 transition-opacity bg-blue-100 ${
          showCreateForm || showEditForm ? "opacity-50" : "opacity-100"
        }`}
      >
        {users.map((user) => (
          <Card
            key={user.id}
            user={user}
            onEdit={() => {
              setEditingUser(user);
              setShowEditForm(true);
            }}
            onDelete={() => handleDeleteUser(user.id)}
            isDeleting={isLoading.delete === user.id}
          />
        ))}
      </div>

      {notification && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 text-white ${
            notificationType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {notification}
        </div>
      )}
    </div>
  );
}

export default Dashboard;