import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import { useEffect } from "react";
import toast from "react-hot-toast";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login, currentUser, loading, error, isAuthenticated } = useAuth((state) => state);

  const onUserLogin = (userCredObj) => login(userCredObj);

  useEffect(() => {
    if (isAuthenticated) {
      toast.success("Login successful!");
      if (currentUser.role === "USER") navigate("/user-profile");
      else if (currentUser.role === "AUTHOR") navigate("/author-profile");
      else if (currentUser.role === "ADMIN") navigate("/admin-profile");
    }
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100 p-10 w-full max-w-md border border-slate-100">
        {/* Header */}
        <div className="text-center mb-8">
          
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Welcome</h2>
         
        </div>

        {/* Error */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-sm mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onUserLogin)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Signing in...
              </span>
            ) : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{" "}
          <NavLink to="/register" className="text-indigo-600 font-semibold hover:underline">
            Create one
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
