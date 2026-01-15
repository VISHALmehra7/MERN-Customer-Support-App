import { useOpenAi } from "./openaiCaller.js";

export async function aiChatSummary(data) {
  try {
    const prompt = `You are a customer support assistant.

You will receive a JSON array of chat messages.
Each object contains:

senderRole (user or agent)

messageText

Read the full conversation in order and generate a concise summary covering:

the main issue

communication problems if any

final status

Respond ONLY in valid JSON.
Do not add explanations.

Output format:
{ "summary": "2–3 line clear summary" }

Chat Messages : ${JSON.stringify(data)}
`;

    const aiText = await useOpenAi(prompt);
    return JSON.parse(aiText);
  } catch (error) {
    console.log("Error", error);
  }
}
