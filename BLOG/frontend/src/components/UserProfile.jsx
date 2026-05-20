import { useAuth } from "../store/authStore";
import { useNavigate } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;

function UserProfile() {
  const currentUser = useAuth((state) => state.currentUser);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API}/user-api/articles`, { withCredentials: true });
        if (res.status === 200) setArticles(res.data.payload);
      } catch (err) {
        if (err.response?.status === 403) {
          toast.error(err.response.data.message);
        }
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    getArticles();
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium" });

  const handleLike = async (articleId) => {
    try {
      const res = await axios.patch(`${API}/user-api/articles/like`, { articleId }, { withCredentials: true });
      setArticles((prev) => prev.map((a) => (a._id === articleId ? res.data.payload : a)));
    } catch (err) {
      toast.error("Failed to like article");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {error && (
        <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-sm mb-6">{error}</div>
      )}

      {/* Profile Card */}
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
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Welcome</p>
            <h2 className="text-xl font-bold text-slate-800">
              {currentUser?.firstName} {currentUser?.lastName}
            </h2>
            <span className="inline-block text-xs bg-blue-50 text-blue-600 font-semibold px-2.5 py-0.5 rounded-full mt-0.5">
              Reader
            </span>
          </div>
        </div>
      </div>

      {/* Articles */}
      <h3 className="text-xl font-bold text-slate-800 mb-5">Latest Articles</h3>

      {articles.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <div className="text-5xl mb-3">📭</div>
          <p>No articles available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {articles.map((article) => {
            const isLiked = article.likes?.some((id) =>
              (typeof id === "object" ? id._id : id).toString() === currentUser?._id?.toString()
            );
            return (
              <div
                key={article._id}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
              >
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-2">
                    {article.category}
                  </span>
                  <h4 className="font-bold text-slate-800 text-base leading-snug mb-2">{article.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed flex-1">{article.content.slice(0, 80)}...</p>
                  <div className="flex items-center gap-2 mt-3">
                    {article.author?.profileImageUrl ? (
                      <img src={article.author.profileImageUrl} className="w-6 h-6 rounded-full object-cover" alt="" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold">
                        {article.author?.firstName?.charAt(0)}
                      </div>
                    )}
                    <span className="text-xs text-slate-500">{article.author?.firstName} {article.author?.lastName}</span>
                    <span className="text-xs text-slate-300 ml-auto">{formatDate(article.createdAt)}</span>
                  </div>
                </div>
                <div className="border-t border-slate-50 px-6 py-3 flex items-center justify-between">
                  <button
                    onClick={() => handleLike(article._id)}
                    className={`flex items-center gap-1.5 text-sm font-medium transition ${
                      isLiked ? "text-rose-500" : "text-slate-400 hover:text-rose-400"
                    }`}
                  >
                    <span>{isLiked ? "❤️" : "🤍"}</span>
                    <span>{article.likes?.length || 0}</span>
                  </button>
                  <button
                    onClick={() => navigate(`/article/${article._id}`, { state: article })}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition"
                  >
                    Read → 
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default UserProfile;
