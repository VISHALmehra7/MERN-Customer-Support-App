import cosineSimilarity from "compute-cosine-similarity";
import { Knowledge } from "../models/KnowledgeModal.js";

export async function findBestMatch(knowledgeList, questionEmbedding) {
  let bestScore = -1;
  let bestKnowledge = null;

  for (const knowledge of knowledgeList) {
    const score = cosineSimilarity(
      questionEmbedding,
      knowledge.knowledgeEmbedding
    );
    if (score > bestScore) {
      bestScore = score;
      bestKnowledge = knowledge;
    }
  }

  return { bestKnowledge, score: bestScore };
}
