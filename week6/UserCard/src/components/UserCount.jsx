import React from "react";

function UserCount({ count }) {
  return (
    <div className="bg-blue-500 text-white text-center py-4 rounded-lg mb-6 shadow-md">
      <h2 className="text-xl font-semibold">
        Total Users Added: {count}
      </h2>
    </div>
  );
}

export default UserCount;