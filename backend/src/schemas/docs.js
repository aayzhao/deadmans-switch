import mongoose from "mongoose";

const DocSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  text: {
    type: String,
    required: true,
    default: "",
  },
});

export default mongoose.model("Docs", DocSchema);
