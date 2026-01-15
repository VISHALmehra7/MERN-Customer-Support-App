import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;
const AI_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000/api/ai-chat"
    : "/api/ai-chat";

export const chatStore = create((set) => ({
  isChatLoading: false,
  error: null,
  summary: null,
  ragChat: null,

  createChatSummary: async (ticketId) => {
    set({ isChatLoading: true });
    try {
      const response = await axios.post(`${AI_URL}/chat-summary`, {
        ticketId,
      });

      set({ isChatLoading: false, summary: response.data.result.summary });
    } catch (error) {
      console.log("Error : ", error);
      set({ isChatLoading: false, error: error.response?.data?.message });
      toast.error(error.response?.data?.message);
    }
  },
  createRagChat: async (question) => {
    try {
      set({ isChatLoading: true });
      const response = await axios.post(`${AI_URL}/rag-question`, {
        question,
      });
      set({ isChatLoading: false, ragChat: response.data.answer });
    } catch (error) {
      console.log("Error: ", error);
      set({ isChatLoading: false, error: error.response?.data?.message });
    }
  },
  clearRagChat: () => {
    try {
      set({ ragChat: null });
    } catch (error) {
      console.log(error);
    }
  },
  clearSummary: () => {
    try {
      set({ summary: null });
    } catch (error) {
      console.log(error);
    }
  },
}));
