import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;

function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();

  const onUserRegister = async (userObj) => {
    const formData = new FormData();
    formData.append("role", userObj.role);
    formData.append("firstName", userObj.firstName);
    formData.append("lastName", userObj.lastName || "");
    formData.append("email", userObj.email);
    formData.append("password", userObj.password);
    if (userObj.profileImageUrl?.[0]) {
      formData.append("profileImageUrl", userObj.profileImageUrl[0]);
    }

    try {
      setLoading(true);
      setApiError(null);
      const res = await axios.post(`${API}/auth/users`, formData, { withCredentials: true });
      if (res.status === 201) {
        toast.success("Account created! Please sign in.");
        navigate("/login");
      }
    } catch (err) {
      setApiError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-3xl shadow-xl shadow-indigo-100 p-10 w-full max-w-lg border border-slate-100">
        {/* Header */}
        <div className="text-center mb-8">
         
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Create an Account</h2>
         
        </div>

        {apiError && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-sm mb-5">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onUserRegister)} className="space-y-5">
          {/* Role */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Register as
            </label>
            <div className="flex gap-4">
              {["USER", "AUTHOR"].map((role) => (
                <label key={role} className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    value={role}
                    {...register("role", { required: "Please select a role" })}
                    className="accent-indigo-600 w-4 h-4"
                  />
                  <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition">
                    {role === "USER" ? " Reader" : "Author"}
                  </span>
                </label>
              ))}
            </div>
            {errors.role && <p className="text-rose-500 text-xs mt-1">{errors.role.message}</p>}
          </div>

          <hr className="border-slate-100" />

          {/* Profile Image */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Profile Photo <span className="normal-case font-normal text-slate-400">(optional)</span>
            </label>
            <div className="flex items-center gap-4">
              {preview ? (
                <img src={preview} alt="preview" className="w-16 h-16 rounded-full object-cover border-2 border-indigo-200" />
              ) : (
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-2xl border-2 border-dashed border-slate-200">
                  👤
                </div>
              )}
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="text-sm text-slate-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 transition"
                {...register("profileImageUrl", {
                  validate: {
                    fileType: (files) => !files?.[0] || ["image/png", "image/jpeg"].includes(files[0].type) || "Only JPG/PNG allowed",
                    fileSize: (files) => !files?.[0] || files[0].size <= 2 * 1024 * 1024 || "Max 2MB",
                  },
                })}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) setPreview(URL.createObjectURL(file));
                }}
              />
            </div>
            {errors.profileImageUrl && <p className="text-rose-500 text-xs mt-1">{errors.profileImageUrl.message}</p>}
          </div>

          {/* Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">First Name</label>
              <input
                type="text"
                
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                {...register("firstName", { required: "Required", minLength: { value: 2, message: "Min 2 chars" } })}
              />
              {errors.firstName && <p className="text-rose-500 text-xs mt-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Last Name</label>
              <input
                type="text"
                
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                {...register("lastName")}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Email Address</label>
            <input
              type="email"
              
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Password</label>
            <input
              type="password"
              placeholder="Min. 6 characters"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Min 6 characters" } })}
            />
            {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Creating account...
              </span>
            ) : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6">
          Already have an account?{" "}
          <NavLink to="/login" className="text-indigo-600 font-semibold hover:underline">
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;
