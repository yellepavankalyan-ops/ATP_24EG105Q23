import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";

function Users({ onAddUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {users.map((user) => (
        <UserCard key={user.id} user={user} onAddUser={onAddUser} />
      ))}
    </div>
  );
}

export default Users;