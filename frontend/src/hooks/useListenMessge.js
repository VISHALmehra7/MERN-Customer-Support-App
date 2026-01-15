import { useEffect, useRef } from "react";
import { useSocketContext } from "../context/SocketContext";
import { messageStore } from "../store/messageStore";
import { ticketStore } from "../store/ticketStore";

export const useListenMessage = () => {
  const { socket } = useSocketContext();
  const { addMessage } = messageStore();
  const currentTicket = ticketStore((state) => state.currentTicket);
  const previousTicketRef = useRef(null);

  useEffect(() => {
    if (!socket || !currentTicket) return;

    if (previousTicketRef.current) {
      socket.emit("leaveTicket", previousTicketRef.current._id);
    }

    socket.emit("joinTicket", currentTicket._id);
    previousTicketRef.current = currentTicket;

    const handleNewMessage = (newMessage) => {
      if (newMessage.ticketId === currentTicket._id) {
        addMessage(newMessage);
      }
    };

    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
      if (currentTicket) {
        socket.emit("leaveTicket", currentTicket._id);
      }
    };
  }, [socket, currentTicket, addMessage]);
};
