import { useOpenAi } from "./openaiCaller.js";

export async function ticketCategory(title) {
  const prompt = `You are a support ticket classifier.

Classify the following ticket into ONE category .

Allowed categories:

Billing

Technical

Account

General



Ticket title:
${title}

Respond ONLY in valid JSON.
Do not add explanations.

Format:
{
"category": "<one of the allowed categories>"
}`;
  const aiText = await useOpenAi(prompt)
  return JSON.parse(aiText);
  
}
