import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  emails: {
    type: [String],
    required: true,
    default: [],
  },
});

export default mongoose.model("Emails", EmailSchema);
