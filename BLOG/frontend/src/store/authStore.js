import { create } from "zustand";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export const useAuth = create((set) => ({
  currentUser: null,
  loading: false,
  isAuthenticated: false,
  error: null,

  login: async (userCred) => {
    try {
      set({ loading: true, currentUser: null, isAuthenticated: false, error: null });
      const res = await axios.post(`${API}/auth/login`, userCred, { withCredentials: true });
      if (res.status === 200) {
        set({ currentUser: res.data.payload, loading: false, isAuthenticated: true, error: null });
      }
    } catch (err) {
      set({
        loading: false,
        isAuthenticated: false,
        currentUser: null,
        error: err.response?.data?.message || "Login failed",
      });
    }
  },

  logout: async () => {
    try {
      await axios.get(`${API}/auth/logout`, { withCredentials: true });
    } catch (_) {}
    set({ currentUser: null, loading: false, isAuthenticated: false, error: null });
  },

  checkAuth: async () => {
    try {
      set({ loading: true });
      const res = await axios.get(`${API}/auth/check-auth`, { withCredentials: true });
      set({ currentUser: res.data.payload, isAuthenticated: true, loading: false });
    } catch (err) {
      set({ currentUser: null, isAuthenticated: false, loading: false });
    }
  },
}));
