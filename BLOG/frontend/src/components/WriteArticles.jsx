import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;

const CATEGORIES = ["Technology", "Programming", "AI", "Web Development", "Science", "Business", "Design"];

function WriteArticles() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth((state) => state.currentUser);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const submitArticle = async (articleObj) => {
    setLoading(true);
    articleObj.author = currentUser._id;
    try {
      const res = await axios.post(`${API}/author-api/article`, articleObj, { withCredentials: true });
      if (res.status === 201) {
        toast.success("Article published!");
        reset();
        navigate("../articles");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to publish");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 max-w-3xl">
      <h2 className="text-xl font-bold text-slate-800 mb-6">Write New Article</h2>

      <form onSubmit={handleSubmit(submitArticle)} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Title</label>
          <input
            type="text"
            placeholder="Give your article a great title..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
            {...register("title", { required: "Title is required", minLength: { value: 5, message: "Min 5 characters" } })}
          />
          {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
          <select
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
            {...register("category", { required: "Category is required" })}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => <option key={c} value={c.toLowerCase()}>{c}</option>)}
          </select>
          {errors.category && <p className="text-rose-500 text-xs mt-1">{errors.category.message}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Content</label>
          <textarea
            rows="10"
            placeholder="Write your article here..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition resize-none"
            {...register("content", { required: "Content is required", minLength: { value: 50, message: "Min 50 characters" } })}
          />
          {errors.content && <p className="text-rose-500 text-xs mt-1">{errors.content.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Publishing...
            </span>
          ) : "Publish Article"}
        </button>
      </form>
    </div>
  );
}

export default WriteArticles;
