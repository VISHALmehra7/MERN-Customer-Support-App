import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ticketStore } from "./ticketStore.js";
import { messageStore } from "./messageStore.js";
import {chatStore} from "./aiStore.js"
 
axios.defaults.withCredentials = true;
const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000/api/auth"
    : "/api/auth";

export const authStore = create((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: false,
  role: null,

  signup: async ({ name, email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, {
        name,
        email,
        password,
      });
      set({
        user: response.data.user,
        isLoading: false,
        isAuthenticated: true,
        role: response.data.user.role,
      });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      toast.error(error.response.data.message || "signup failed");
    }
  },
  login: async ({ email, password }) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      set({
        user: response.data.user,
        isLoading: false,
        isAuthenticated: true,
        role: response.data.user.role,
      });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Error logging in",
        isAuthenticated: false,
        isLoading: false,
        isCheckingAuth: true,
      });
      toast.error(error.response.data.message || "Login failed");
    }
  },

  checkAuth: async () => {
    set({ isLoading: true, error: null, isCheckingAuth: true });
    try {
      const response = await axios.post(`${API_URL}/check-auth`);
      set({
        isLoading: false,
        isCheckingAuth: false,
        user: response.data.user,
        role: response.data.user.role,
        isAuthenticated: true,
      });
    } catch (error) {
      console.log(error);
      set({
        isAuthenticated: false,
        isLoading: false,
        error: error.response?.data?.message || "Error checking auth",
        isCheckingAuth: false,
      });
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/logout`);

      set({
        user: null,
        role: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
      ticketStore.getState().setCurrentTicketNull()
      ticketStore.getState().setUserTicketNull()
      messageStore.getState().setAllMessageNull()
      chatStore.getState().clearRagChat()
      chatStore.getState().clearSummary()
      toast.success(response.data.message);
    } catch (error) {
      set({
        isLoading: false,
        error: error.response?.data?.message || "Logout failed",
      });

      toast.error(error.response?.data?.message || "Logout failed");
    }
  },
}));
