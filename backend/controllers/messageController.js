import { Message } from "../models/MessageModel.js";
import { Ticket } from "../models/TicketModel.js";
import { User } from "../models/UserModel.js";
import { io } from "../socket/socket.js";

export const createMessage = async (req, res) => {
  try {
    const { messageText, ticketId } = req.body;

    if (!messageText || !ticketId) {
      return res.status(400).json({ success: false, message: "Invalid Input" });
    }

    const sender = await User.findById(req.userId);
    if (!sender) {
      return res
        .status(404)
        .json({ success: false, message: "Login to send messages" });
    }

    if (sender.role === "agent") {
      const existingTicket = await Ticket.findById(ticketId);
      existingTicket.status = "in-progress";
      existingTicket.save();
    }

    const newMessage = await new Message({
      ticketId,
      senderId: sender._id,
      senderRole: sender.role,
      messageText: messageText,
    });

    newMessage.save();
    io.to(ticketId).emit("newMessage", newMessage);
    res.status(200).json({ success: true, newMessage });
  } catch (error) {
    console.log("Error in createMessage controller : ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { ticketId } = req.body;
    if (!ticketId) {
      return res
        .status(400)
        .json({ success: false, message: "Ticket not found" });
    }
    const allMessages = await Message.find({ ticketId: ticketId }).sort({
      createdAt: 1,
    });
    res.status(200).json({ success: true, messages: allMessages });
  } catch (error) {
    console.log("Error in getMessage controller : ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
