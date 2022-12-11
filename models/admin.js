import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String
});

module.exports =
  mongoose?.models?.admin || mongoose.model("admin", adminSchema);