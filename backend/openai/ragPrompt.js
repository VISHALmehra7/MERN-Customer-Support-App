import { useOpenAi } from "./openaiCaller.js";

export async function ragPrompt(content, question) {
  console.log(content);
  try {
    const prompt = `You are an AI assistant. Use the reference knowledge below to answer the user's question. 
If the reference does not contain enough information, respond: "I don't know."

Reference Knowledge:${content}

User Question:${question}

Answer the user clearly and concisely based on the reference knowledge.
`;

    const aiText = await useOpenAi(prompt);
    return aiText;
  } catch (error) {
    console.log("Error", error);
  }
}
