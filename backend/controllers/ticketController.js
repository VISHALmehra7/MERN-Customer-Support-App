import { Knowledge } from "../models/KnowledgeModal.js";
import { Ticket } from "../models/TicketModel.js";
import { knowledgeEmbedding } from "../openai/createEmbedding.js";
import { ticketCategory } from "../openai/ticketCategory.js";

export const createTicket = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ success: false, message: "Invalid Input" });
    }
    const aiResult = await ticketCategory(title);

    const newTicket = await new Ticket({
      title,
      description,
      category: aiResult.category,
      createdBy: req.userId,
    });
    await newTicket.save();
    res.status(200).json({
      success: true,
      message: "Ticket Successfully Created",
      ticket: newTicket,
    });
  } catch (error) {
    console.log("Error occured in create Ticket controller", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getUserTickets = async (req, res) => {
  try {
    const userTickets = await Ticket.find({
      createdBy: req.userId,
      status: { $ne: "closed" },
    });
    if (!userTickets || userTickets.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Ticket not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Tickets found", ticket: userTickets });
  } catch (error) {
    console.log("Error occured in getUserTickets controller ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find().populate("createdBy", "name email");

    if (!tickets || tickets.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Ticket Found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Tickets Found", ticket: tickets });
  } catch (error) {
    console.log("Error occured in getAllTickets controller ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createKnowledge = async (req, res) => {
  try {
    const { title, content, ticketId } = req.body;
    if (!ticketId) {
      return res
        .status(400)
        .json({ success: false, message: "Ticket not provided" });
    }
    if (!title || !content) {
      return res.status(400).json({ success: false, message: "Invalid Input" });
    }
    const existingTicket = await Ticket.findById(ticketId);
    if (!existingTicket) {
      return res
        .status(404)
        .json({ status: false, message: "Ticket Not Found" });
    }
    existingTicket.status = "closed";
    await existingTicket.save();
    const embedding = await knowledgeEmbedding(content);
    const newKnowledge = await new Knowledge({
      title,
      content,
      knowledgeEmbedding: embedding,
    });

    await newKnowledge.save();
    res.status(200).json({ success: true, knowledge: newKnowledge });
  } catch (error) {
    console.log("Error in createKnowledge controller : ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
