import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  userName: String,
  password: String
});

module.exports =
  mongoose?.models?.admin || mongoose.model("admin", adminSchema);