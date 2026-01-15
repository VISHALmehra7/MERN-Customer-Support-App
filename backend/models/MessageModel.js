import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    senderRole: {
      type: String,
      enum: ["user", "agent"],
    },
    messageText: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Message = mongoose.model("message", messageSchema);
