import { NavLink } from "react-router";
import { useAuth } from "../store/authStore";

function Home() {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const user = useAuth((state) => state.currentUser);

  const getProfilePath = () => {
    if (!user) return "/register";
    switch (user.role) {
      case "AUTHOR": return "/author-profile";
      case "ADMIN": return "/admin-profile";
      default: return "/user-profile";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-violet-50">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
        
        <h1 className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight mb-6">
          Imaginations To RealTimes  <br />
         
        </h1>
        <p className="text-lg text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">
          Read Your passionate stories...
        </p>
        <div className="flex items-center justify-center gap-4">
          {isAuthenticated ? (
            <NavLink
              to={getProfilePath()}
              className="bg-indigo-600 text-white font-bold px-8 py-3.5 rounded-full hover:bg-indigo-700 transition text-sm shadow-lg shadow-indigo-200"
            >
              Go to Dashboard →
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/register"
                className="bg-indigo-600 text-white font-bold px-8 py-3.5 rounded-full hover:bg-indigo-700 transition text-sm shadow-lg shadow-indigo-200"
              >
                Get Started Free
              </NavLink>
              <NavLink
                to="/login"
                className="text-slate-700 font-semibold px-6 py-3.5 rounded-full border border-slate-200 hover:bg-slate-50 transition text-sm"
              >
                Sign In
              </NavLink>
            </>
          )}
        </div>
      </div>

     
    </div>
  );
}

export default Home;
