import mongoose from "mongoose";

const knowledgeSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    knowledgeEmbedding:{
      type:[Number],
    }
  },

  { timestamps: true }
);

export const Knowledge = mongoose.model("knowledge", knowledgeSchema);
