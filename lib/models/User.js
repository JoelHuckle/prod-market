import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  icon: {
    type: String,
    required: true,
    default: "/blank-pfp-jpg",
  },
  banner: {
    type: String,
    required: true,
    default: "/cover.png",
  },
  following: {
    type: Array,
    required: true,
    default: [],
  },
  subscribed: {
    type: Array,
    required: true,
    default: [],
  },
  loops: {
    type: Array,
    required: true,
    default: [],
  },
  services: {
    type: Array,
    required: true,
    default: [],
  },
  purchasedLoops: {
    type: Array,
    required: true,
    default: [],
  },
  purchasedservices: {
    type: Array,
    required: true,
    default: [],
  },
});

export default mongoose.model("User", userSchema);
