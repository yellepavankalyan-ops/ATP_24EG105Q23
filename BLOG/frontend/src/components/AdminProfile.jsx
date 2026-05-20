import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/authStore";
import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;

function AdminProfile() {
  const currentUser = useAuth((state) => state.currentUser);
  const [tab, setTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
    fetchArticles();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/admin-api/users`, { withCredentials: true });
      setUsers(res.data.payload);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const fetchArticles = async () => {
    try {
      const res = await axios.get(`${API}/admin-api/articles`, { withCredentials: true });
      setArticles(res.data.payload);
    } catch (err) {
      toast.error("Failed to load articles");
    }
  };

  const toggleUserBlock = async (userId) => {
    try {
      const res = await axios.patch(`${API}/admin-api/user/${userId}/block`, {}, { withCredentials: true });
      setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, isUserActive: !u.isUserActive } : u)));
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to update user");
    }
  };

  const toggleArticleBlock = async (articleId) => {
    try {
      const res = await axios.patch(`${API}/admin-api/article/${articleId}/block`, {}, { withCredentials: true });
      setArticles((prev) => prev.map((a) => (a._id === articleId ? { ...a, isArticleActive: !a.isArticleActive } : a)));
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Failed to update article");
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Permanently delete this user?")) return;
    try {
      await axios.delete(`${API}/admin-api/user/${userId}`, { withCredentials: true });
      setUsers((prev) => prev.filter((u) => u._id !== userId));
      toast.success("User deleted");
    } catch (err) {
      toast.error("Failed to delete user");
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium" });

  const filteredUsers = users.filter((u) =>
    `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  );

  const filteredArticles = articles.filter((a) =>
    `${a.title} ${a.category}`.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    totalUsers: users.filter((u) => u.role === "USER").length,
    totalAuthors: users.filter((u) => u.role === "AUTHOR").length,
    blockedUsers: users.filter((u) => !u.isUserActive).length,
    totalArticles: articles.length,
    blockedArticles: articles.filter((a) => !a.isArticleActive).length,
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-6 mb-8 text-white shadow-lg shadow-amber-100">
        <div className="flex items-center gap-4">
          {currentUser?.profileImageUrl ? (
            <img src={currentUser.profileImageUrl} className="w-16 h-16 rounded-full object-cover border-2 border-white/30" alt="" />
          ) : (
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
              {currentUser?.firstName?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-amber-100 text-xs font-semibold uppercase tracking-widest">Admin Panel</p>
            <h2 className="text-2xl font-black">
              {currentUser?.firstName} {currentUser?.lastName}
            </h2>
            <p className="text-amber-100 text-sm">{currentUser?.email}</p>
          </div>
          <span className="ml-auto bg-white/20 border border-white/30 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            🛡 Admin
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        {[
          { label: "Readers", value: stats.totalUsers, color: "bg-blue-50 text-blue-600 border-blue-100" },
          { label: "Authors", value: stats.totalAuthors, color: "bg-violet-50 text-violet-600 border-violet-100" },
          { label: "Blocked Users", value: stats.blockedUsers, color: "bg-rose-50 text-rose-600 border-rose-100" },
          { label: "Articles", value: stats.totalArticles, color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
          { label: "Blocked Articles", value: stats.blockedArticles, color: "bg-amber-50 text-amber-600 border-amber-100" },
        ].map((s) => (
          <div key={s.label} className={`${s.color} rounded-2xl border p-4 text-center`}>
            <p className="text-2xl font-black">{s.value}</p>
            <p className="text-xs font-semibold mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          placeholder="Search users or articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-slate-100 p-1.5 rounded-2xl w-fit">
        {["users", "articles"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2 text-sm font-semibold rounded-xl transition capitalize ${
              tab === t ? "bg-white text-amber-600 shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {t === "users" ? `👥 Users (${users.length})` : `📄 Articles (${articles.length})`}
          </button>
        ))}
      </div>

      {/* USERS TAB */}
      {tab === "users" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">User</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Role</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-12 text-slate-400">No users found</td></tr>
              ) : (
                filteredUsers.map((u) => (
                  <tr key={u._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {u.profileImageUrl ? (
                          <img src={u.profileImageUrl} className="w-9 h-9 rounded-full object-cover" alt="" />
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold">
                            {u.firstName?.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-slate-800">{u.firstName} {u.lastName}</p>
                          <p className="text-xs text-slate-400">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        u.role === "AUTHOR" ? "bg-violet-50 text-violet-600" : "bg-blue-50 text-blue-600"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-500 text-xs">{formatDate(u.createdAt)}</td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        u.isUserActive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                      }`}>
                        {u.isUserActive ? "● Active" : "● Blocked"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleUserBlock(u._id)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition ${
                            u.isUserActive
                              ? "bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100"
                              : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100"
                          }`}
                        >
                          {u.isUserActive ? "Block" : "Unblock"}
                        </button>
                        <button
                          onClick={() => deleteUser(u._id)}
                          className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600 border border-slate-100 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* ARTICLES TAB */}
      {tab === "articles" && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Article</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Author</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Stats</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-12 text-slate-400">No articles found</td></tr>
              ) : (
                filteredArticles.map((a) => (
                  <tr key={a._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition">
                    <td className="px-5 py-4 max-w-xs">
                      <p className="font-semibold text-slate-800 truncate">{a.title}</p>
                      <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">{a.category}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {a.author?.profileImageUrl ? (
                          <img src={a.author.profileImageUrl} className="w-7 h-7 rounded-full object-cover" alt="" />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-[10px] font-bold">
                            {a.author?.firstName?.charAt(0)}
                          </div>
                        )}
                        <span className="text-slate-700 text-xs">{a.author?.firstName} {a.author?.lastName}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-400">
                      <span>❤️ {a.likes?.length || 0} &nbsp; 💬 {a.comments?.length || 0}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        a.isArticleActive ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                      }`}>
                        {a.isArticleActive ? "● Visible" : "● Blocked"}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => toggleArticleBlock(a._id)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition ${
                          a.isArticleActive
                            ? "bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-100"
                            : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-100"
                        }`}
                      >
                        {a.isArticleActive ? "Block" : "Unblock"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminProfile;
