import React, { useState } from "react";
import Users from "./components/Users";
import UserCount from "./components/UserCount";

function App() {
  const [count, setCount] = useState(0);

  const handleAddUser = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen  p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Users
      </h1>

      <UserCount count={count} />
      <Users onAddUser={handleAddUser} />
    </div>
  );
}

export default App;