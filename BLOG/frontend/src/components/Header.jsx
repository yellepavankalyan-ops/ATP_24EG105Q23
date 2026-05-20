import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import toast from "react-hot-toast";

function Header() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);
  const logout = useAuth((state) => state.logout);
  const navigate = useNavigate();

  const getProfilePath = () => {
    if (!user) return "/";
    switch (user.role) {
      case "AUTHOR": return "/author-profile";
      case "ADMIN": return "/admin-profile";
      default: return "/user-profile";
    }
  };

  const onLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-white/90 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <span className="text-indigo-600"></span> Blog
        </NavLink>

        {/* Nav Links */}
        <div className="flex items-center gap-2">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-medium text-sm px-4 py-2 rounded-full bg-indigo-50"
                : "text-slate-600 text-sm px-4 py-2 rounded-full hover:bg-slate-100 transition"
            }
          >
            Home
          </NavLink>

          {!isAuthenticated && (
            <>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-medium text-sm px-4 py-2 rounded-full bg-indigo-50"
                    : "text-slate-600 text-sm px-4 py-2 rounded-full hover:bg-slate-100 transition"
                }
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="bg-indigo-600 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-indigo-700 transition"
              >
                Sign In
              </NavLink>
            </>
          )}

          {isAuthenticated && (
            <div className="flex items-center gap-3">
              <NavLink
                to={getProfilePath()}
                className="flex items-center gap-2 text-sm text-slate-700 px-3 py-1.5 rounded-full hover:bg-slate-100 transition"
              >
                {user?.profileImageUrl ? (
                  <img src={user.profileImageUrl} className="w-7 h-7 rounded-full object-cover border border-slate-200" alt="" />
                ) : (
                  <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                    {user?.firstName?.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="font-medium">{user?.firstName}</span>
                {user?.role === "ADMIN" && (
                  <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Admin
                  </span>
                )}
              </NavLink>
              <button
                onClick={onLogout}
                className="text-sm text-rose-500 px-4 py-2 rounded-full hover:bg-rose-50 transition font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
