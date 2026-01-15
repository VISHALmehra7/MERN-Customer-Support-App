import { createEmbeddings } from "./openaiEmbedding.js";

export const knowledgeEmbedding = async (content) => {
  try {
    const embedding = await createEmbeddings(content);
    return embedding;
  } catch (error) {
    console.log("Error in knowledgeEmbedding function : ", error);
  }
};

export const questionEmbedding = async (question) => {
  try {
    const embedding = await createEmbeddings(question);
    return embedding;
  } catch (error) {
    console.log("Error in questionEmbedding function : ", error);
  }
};
