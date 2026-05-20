import { NavLink, Outlet } from "react-router";
import { useAuth } from "../store/authStore";

function AuthorProfile() {
  const currentUser = useAuth((state) => state.currentUser);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {currentUser?.profileImageUrl ? (
            <img src={currentUser.profileImageUrl} className="w-16 h-16 rounded-full object-cover border-2 border-indigo-100" alt="" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-2xl font-bold">
              {currentUser?.firstName?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Author Dashboard</p>
            <h2 className="text-xl font-bold text-slate-800">
              {currentUser?.firstName} {currentUser?.lastName}
            </h2>
            <span className="inline-block text-xs bg-violet-50 text-violet-600 font-semibold px-2.5 py-0.5 rounded-full mt-0.5">
              ✍️ Author
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-slate-100 p-1.5 rounded-2xl w-fit">
        <NavLink
          to="articles"
          className={({ isActive }) =>
            isActive
              ? "bg-white px-5 py-2 rounded-xl text-indigo-600 text-sm font-semibold shadow-sm"
              : "px-5 py-2 text-slate-500 text-sm hover:text-slate-700 transition rounded-xl"
          }
        >
          My Articles
        </NavLink>
        <NavLink
          to="write-article"
          className={({ isActive }) =>
            isActive
              ? "bg-white px-5 py-2 rounded-xl text-indigo-600 text-sm font-semibold shadow-sm"
              : "px-5 py-2 text-slate-500 text-sm hover:text-slate-700 transition rounded-xl"
          }
        >
          + Write Article
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
}

export default AuthorProfile;
