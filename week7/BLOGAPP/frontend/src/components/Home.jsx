// import React from 'react'

// function Home() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Home
import { useAuth } from "../store/authStore";
import { NavLink } from "react-router-dom";

function Home() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const articles = [
    {
      id: 1,
      title: "Getting Started with Python",
      desc: "Learn the basics of Python programming with simple examples.",
    },
    {
      id: 2,
      title: "React for Beginners",
      desc: "Understand components, state, and hooks in React.",
    },
    {
      id: 3,
      title: "Node.js Backend Guide",
      desc: "Build scalable backend APIs using Express and MongoDB.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">

      {/* HERO SECTION */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to MyBlog 🚀
        </h1>
        <p className="text-gray-600 mt-3">
          Read, write, and explore amazing articles.
        </p>

        {/* AUTH BASED BUTTON */}
        <div className="mt-5">
          {!isAuthenticated ? (
            <div className="flex justify-center gap-4">
              <NavLink
                to="/register"
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
              >
                Get Started
              </NavLink>

              <NavLink
                to="/login"
                className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900"
              >
                Login
              </NavLink>
            </div>
          ) : (
            <NavLink
              to="/user-profile"
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
            >
              Go to Profile
            </NavLink>
          )}
        </div>
      </div>

      {/* ARTICLES SECTION */}
      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {article.title}
            </h2>
            <p className="text-gray-600 mt-2">{article.desc}</p>

            <button className="mt-4 text-blue-600 hover:underline">
              Read More →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
