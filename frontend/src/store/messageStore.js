import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;
const MESSAGE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000/api/message"
    : "/api/message";

export const messageStore = create((set) => ({
  allMessages: [],
  isLoading: false,
  error: null,

  createMessage: async (messageText, ticketId) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${MESSAGE_URL}/create-message`, {
        ticketId,
        messageText,
      });
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.response?.data?.message, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },

  getAllMessage: async (ticketId) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${MESSAGE_URL}/get-messages`, {
        ticketId,
      });
      set({ isLoading: false, allMessages: response.data.messages });
    } catch (error) {
      console.log(error);
      set({ error: error.response?.data?.message, isLoading: false });
    }
  },
  addMessage: (newMessage) =>
    set((state) => ({
      allMessages: [...state.allMessages, newMessage],
    })),

  setAllMessageNull: () => {
    try {
      set({ allMessages: [] });
    } catch (error) {
      console.log(error);
    }
  },
}));
