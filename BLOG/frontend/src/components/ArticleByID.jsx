import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/authStore";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    if (article) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/user-api/articles/${id}`, { withCredentials: true });
        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load article");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });

  const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;
    if (!window.confirm(newStatus ? "Restore this article?" : "Remove this article?")) return;
    try {
      const res = await axios.patch(
        `${API}/author-api/article`,
        { articleId: article._id, isArticleActive: newStatus },
        { withCredentials: true }
      );
      if (!newStatus) {
        toast.success("Article removed");
        navigate("/author-profile");
        return;
      }
      setArticle(res.data.payload);
      toast.success("Article restored");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
    }
  };

  const handleLike = async () => {
    try {
      const res = await axios.patch(
        `${API}/user-api/articles/like`,
        { articleId: article._id },
        { withCredentials: true }
      );
      setArticle(res.data.payload);
    } catch (err) {
      toast.error("Failed to like");
    }
  };

  const addComment = async (commentObj) => {
    setCommentLoading(true);
    try {
      const res = await axios.put(
        `${API}/user-api/articles`,
        { articleId: article._id, comment: commentObj.comment },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setArticle(res.data.payload);
        reset();
        toast.success("Comment added!");
      }
    } catch (err) {
      toast.error("Failed to add comment");
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error) return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3">{error}</div>
    </div>
  );

  if (!article) return null;

  const isLiked = user && article.likes?.some((id) =>
    (typeof id === "object" ? id._id : id).toString() === user._id?.toString()
  );

  return (
    <div className="max-w-3xl mx-auto px-6 py-14">
      {/* Status banner for blocked */}
      {!article.isArticleActive && (
        <div className="bg-amber-50 border border-amber-200 text-amber-700 rounded-xl px-4 py-3 text-sm mb-6">
          ⚠️ This article has been removed and is not publicly visible.
        </div>
      )}

      {/* Header */}
      <div className="mb-10">
        <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">
          {article.category}
        </span>
        <h1 className="text-4xl font-black text-slate-900 leading-tight tracking-tight mt-3 mb-5">
          {article.title}
        </h1>

        <div className="flex items-center justify-between border-t border-b border-slate-100 py-4">
          <div className="flex items-center gap-3">
            {article.author?.profileImageUrl ? (
              <img src={article.author.profileImageUrl} className="w-9 h-9 rounded-full object-cover" alt="" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
                {article.author?.firstName?.charAt(0)}
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {article.author?.firstName} {article.author?.lastName}
              </p>
              <p className="text-xs text-slate-400">{formatDate(article.createdAt)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span>❤️ {article.likes?.length || 0}</span>
            <span>💬 {article.comments?.length || 0}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base whitespace-pre-line mb-12">
        {article.content}
      </div>

      {/* Author Actions */}
      {user?.role === "AUTHOR" && (
        <div className="flex gap-3 mb-10 p-5 bg-slate-50 rounded-2xl border border-slate-100">
          <p className="text-xs text-slate-400 font-medium mr-auto self-center">Author controls</p>
          <button
            onClick={() => navigate("/edit-article", { state: article })}
            className="bg-indigo-600 text-white text-sm font-semibold px-5 py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            ✏️ Edit
          </button>
          <button
            onClick={toggleArticleStatus}
            className={`text-sm font-semibold px-5 py-2 rounded-xl transition ${
              article.isArticleActive
                ? "bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100"
                : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100"
            }`}
          >
            {article.isArticleActive ? "🗑 Remove" : "↩ Restore"}
          </button>
        </div>
      )}

      {/* User Like & Comment */}
      {user?.role === "USER" && (
        <div className="mb-10">
          {/* Like Button */}
          <button
            onClick={handleLike}
            className={`flex items-center gap-2 font-semibold px-6 py-3 rounded-xl border transition mb-8 ${
              isLiked
                ? "bg-rose-50 text-rose-600 border-rose-200"
                : "bg-white text-slate-500 border-slate-200 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200"
            }`}
          >
            <span className="text-lg">{isLiked ? "❤️" : "🤍"}</span>
            <span className="text-sm">{isLiked ? "Liked" : "Like this article"}</span>
            <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full ml-1">
              {article.likes?.length || 0}
            </span>
          </button>

          {/* Comment Form */}
          <div className="bg-slate-50 rounded-2xl border border-slate-100 p-5">
            <h3 className="text-sm font-bold text-slate-700 mb-3">Leave a Comment</h3>
            <form onSubmit={handleSubmit(addComment)} className="flex gap-3">
              <input
                type="text"
                {...register("comment", { required: true })}
                placeholder="Share your thoughts..."
                className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
              />
              <button
                type="submit"
                disabled={commentLoading}
                className="bg-indigo-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition disabled:opacity-60 whitespace-nowrap"
              >
                {commentLoading ? "..." : "Post"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Comments Section */}
      <div>
        <h3 className="text-lg font-bold text-slate-800 mb-5">
          Comments ({article.comments?.length || 0})
        </h3>

        {article.comments?.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-8">No comments yet. Be the first!</p>
        ) : (
          <div className="space-y-4">
            {article.comments.map((c, i) => {
              const name = c.user?.firstName
                ? `${c.user.firstName} ${c.user.lastName || ""}`
                : c.user?.email || "User";
              return (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    {c.user?.profileImageUrl ? (
                      <img src={c.user.profileImageUrl} className="w-8 h-8 rounded-full object-cover" alt="" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-xs font-bold">
                        {name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{name}</p>
                      <p className="text-xs text-slate-400">{formatDate(c.createdAt || new Date())}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{c.comments}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 mt-12 pt-6 text-xs text-slate-400">
        Last updated: {formatDate(article.updatedAt)}
      </div>
    </div>
  );
}

export default ArticleByID;
