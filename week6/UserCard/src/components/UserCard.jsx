import React from "react";

function UserCard({ user, onAddUser }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 text-center">
      <h3 className="text-lg font-bold mb-2">{user.name}</h3>
      <p className="text-gray-600 mb-4">{user.email}</p>

      <button
        onClick={onAddUser}
        className="bg-yellow-500  text-white px-4 py-2 rounded-lg "
      >
        Add User
      </button>
    </div>
  );
}

export default UserCard;