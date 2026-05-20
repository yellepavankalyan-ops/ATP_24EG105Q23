import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../store/authStore";
const API = import.meta.env.VITE_API_URL;

function AuthorArticles() {
  const navigate = useNavigate();
  const user = useAuth((state) => state.currentUser);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/author-api/article`, { withCredentials: true });
        if (res.status === 200) setArticles(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [user]);

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium" });

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (error) return <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-sm">{error}</div>;

  if (articles.length === 0) return (
    <div className="text-center py-20 text-slate-400">
      <div className="text-5xl mb-3">✍️</div>
      <p>You haven't published any articles yet.</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {articles.map((article) => (
        <div
          key={article._id}
          className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col cursor-pointer"
          onClick={() => navigate(`/article/${article._id}`, { state: article })}
        >
          <div className="p-6 flex-1">
            <div className="flex items-start justify-between mb-2">
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">
                {article.category}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  article.isArticleActive
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-rose-50 text-rose-500"
                }`}
              >
                {article.isArticleActive ? "● Active" : "● Removed"}
              </span>
            </div>
            <h4 className="font-bold text-slate-800 text-base leading-snug mb-2">{article.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{article.content.slice(0, 80)}...</p>
          </div>
          <div className="border-t border-slate-50 px-6 py-3 flex items-center justify-between">
            <span className="text-xs text-slate-400">{formatDate(article.createdAt)}</span>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span>❤️ {article.likes?.length || 0}</span>
              <span>💬 {article.comments?.length || 0}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AuthorArticles;
