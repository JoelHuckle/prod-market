import mongoose from "mongoose";

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    preview: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model("Post", postSchema);
