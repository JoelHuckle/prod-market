import mongoose from "mongoose";

const { Schema } = mongoose;

const serviceSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    waitTime: {
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
    contract: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Service ||
  mongoose.model("Service", serviceSchema);
