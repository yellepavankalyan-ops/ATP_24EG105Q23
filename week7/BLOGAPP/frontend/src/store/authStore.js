import { create } from "zustand";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  initialized: false,   // NEW: true once checkAuth has resolved at least once
  error: null,
  login: async (userCred) => {
    try {
      set({ loading: true, currentUser: null, isAuthenticated: false, error: null });
      let res = await axios.post(`${API}/auth/login`, userCred, { withCredentials: true });
      if (res.status === 200) {
        set({
          currentUser: res.data?.payload,
          loading: false,
          isAuthenticated: true,
          initialized: true,
          error: null,
        });
      }
    } catch (err) {
      console.log("err is ", err);
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.error || "Login failed",
      });
    }
  },
  logout: async () => {
    try {
      let res = await axios.get(`${API}/auth/logout`, { withCredentials: true });
      if (res.status === 200) {
        set({
          currentUser: null,
          isAuthenticated: false,
          error: null,
          loading: false,
        });
      }
    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.error || "Logout failed",
      });
    }
  },

  // restore login
  checkAuth: async () => {
    try {
      set({ loading: true });
      const res = await axios.get(`${API}/auth/check-auth`, { withCredentials: true });
      set({
        currentUser: res.data.payload,
        isAuthenticated: true,
        loading: false,
        initialized: true,   // auth check done
      });
    } catch (err) {
      if (err.response?.status === 401) {
        set({
          currentUser: null,
          isAuthenticated: false,
          loading: false,
          initialized: true,   // auth check done (user is just not logged in)
        });
        return;
      }
      console.error("Auth check failed:", err);
      set({ loading: false, initialized: true });
    }
  },
}));
