const mongoose = require("mongoose");
const { Schema } = mongoose;




// Define the main schema
const listSchema = new Schema(
  {
    title: { type: String, required: true },
    type: { type: String },
    genre: { type: String },
    content: [],  // Use the content schema for the content array
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", listSchema);
