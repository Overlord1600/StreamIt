const mongoose = require("mongoose");
const { Schema } = mongoose;
const listSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String },
    genre: { type: String },
    content: [],  
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", listSchema);
