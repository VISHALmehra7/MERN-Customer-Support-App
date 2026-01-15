import { Knowledge } from "../models/KnowledgeModal.js";
import { Message } from "../models/MessageModel.js";
import { aiChatSummary } from "../openai/chatSummary.js";
import { questionEmbedding } from "../openai/createEmbedding.js";
import { ragPrompt } from "../openai/ragPrompt.js";
import { findBestMatch } from "../utils/calculateSimilarity.js";

export const chatSummary = async (req, res) => {
  try {
    const { ticketId } = req.body;
    if (!ticketId) {
      return res
        .status(400)
        .json({ success: false, message: "No Ticket Provided" });
    }
    const message = await Message.find({ ticketId: ticketId });
    if (!message || message.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No Message to Check " });
    }

    const data = message.map((singleMessage) => {
      return {
        senderRole: singleMessage.senderRole,
        messageText: singleMessage.messageText,
      };
    });
    const aiResult = await aiChatSummary(data);
    res.status(200).json({ success: true, result: aiResult });
  } catch (error) {
    console.log("Error in chatSummary controller: ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const ragModel = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res
        .status(400)
        .json({ success: false, message: "No Quesion Asked" });
    }
    const knowledgeList = await Knowledge.find();
    const embedding = await questionEmbedding(question);
    const result = await findBestMatch(knowledgeList, embedding);
    const answer = await ragPrompt(result.bestKnowledge.content, question);
    res.status(200).json({ success: true, answer: answer });
  } catch (error) {
    console.log("Error in ragModel controller : ", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
