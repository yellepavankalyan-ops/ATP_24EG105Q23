import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;

const CATEGORIES = ["Technology", "Programming", "AI", "Web Development", "Science", "Business", "Design"];

function EditArticle() {
  const location = useLocation();
  const navigate = useNavigate();
  const article = location.state;
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    if (!article) return;
    setValue("title", article.title || "");
    setValue("category", article.category || "");
    setValue("content", article.content || "");
  }, [article, setValue]);

  const updateArticle = async (modifiedArticle) => {
    try {
      const res = await axios.put(
        `${API}/author-api/article`,
        { ...modifiedArticle, articleId: article?._id },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Article updated!");
        navigate(`/article/${article._id}`, { state: res.data.payload });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (!article) return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-center text-slate-500">No article data found.</div>
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
        <h2 className="text-xl font-bold text-slate-800 mb-6">Edit Article</h2>

        <form onSubmit={handleSubmit(updateArticle)} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Title</label>
            <input
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              {...register("title", { required: "Title required" })}
            />
            {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Category</label>
            <select
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              {...register("category", { required: "Category required" })}
            >
              <option value="">Select category</option>
              {CATEGORIES.map((c) => <option key={c} value={c.toLowerCase()}>{c}</option>)}
            </select>
            {errors.category && <p className="text-rose-500 text-xs mt-1">{errors.category.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">Content</label>
            <textarea
              rows="14"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition resize-none"
              {...register("content", { required: "Content required" })}
            />
            {errors.content && <p className="text-rose-500 text-xs mt-1">{errors.content.message}</p>}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold px-8 py-3 rounded-xl hover:bg-indigo-700 transition"
            >
              Update Article
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="border border-slate-200 text-slate-600 font-semibold px-6 py-3 rounded-xl hover:bg-slate-50 transition"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditArticle;
