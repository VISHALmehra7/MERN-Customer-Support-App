import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.withCredentials = true;
const TICKET_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:4000/api/ticket"
    : "/api/ticket";

export const ticketStore = create((set) => ({
  userTicket: [],
  allTickets: [],
  openTickets: null,
  inProgressTickets: null,
  closedTickets: null,
  currentTicket: null,
  isTicketLoading: false,
  error: null,
  showModal: false,

  fetchUserTicket: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${TICKET_URL}/get-user-ticket`);
      set({
        isTicketLoading: false,
        userTicket: response.data.ticket,
      });
    } catch (error) {
      console.log(error);
      set({ error: error.response?.data?.message, isTicketLoading: false });
    }
  },

  fetchAllTickets: async () => {
    set({ isTicketLoading: true });
    try {
      const response = await axios.get(`${TICKET_URL}/get-all-tickets`);

      set({
        isTicketLoading: false,
        allTickets: response.data.ticket,
      });
    } catch (error) {
      console.log(error);
      set({ error: error.response?.data?.message, isTicketLoading: false });
    }
  },
  createTicket: async ({ title, description }) => {
    set({ isTicketLoading: true });
    try {
      const response = await axios.post(`${TICKET_URL}/create-ticket`, {
        title,
        description,
      });
      set({ isTicketLoading: false });
      set((state) => ({
        userTicket: [...state.userTicket, response?.data?.ticket],
      }));
      toast.success(response.data.message || "Ticket Raised Successfully");
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Ticket Creation Failed",
        isTicketLoading: false,
      });
      toast.error(error.response?.data?.message || "Ticket Creation Failed");
    }
  },
  setCurrentTicket: (ticket) => {
    try {
      set({ currentTicket: ticket });
    } catch (error) {
      console.log(error);
    }
  },

  setCurrentTicketNull: () => {
    try {
      set({ currentTicket: null });
    } catch (error) {
      console.log(error);
    }
  },
  setShowModal: () => {
    try {
      set((state) => ({ showModal: !state.showModal }));
    } catch (error) {
      console.log(error);
    }
  },
  saveKnowledge: async ({ title, content, ticketId }) => {
    try {
      set({ isTicketLoading: true });
      const response = await axios.post(`${TICKET_URL}/create-knowledge`, {
        title,
        content,
        ticketId,
      });
      set({ isTicketLoading: false });
      toast.success(response.data.message || "Knowledge created Successfully");
    } catch (error) {
      console.log(error);
      set({
        error: error.response?.data?.message || "Knowledge creation failed",
      });
      toast.error(error.response?.data?.message || "Knowledge creation failed");
    }
  },
  setUserTicketNull: () => {
    try {
      set({ userTicket: [] });
    } catch (error) {
      console.log(error);
    }
  },
}));
