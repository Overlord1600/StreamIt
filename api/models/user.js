const { type } = require("@testing-library/user-event/dist/type");
const mongoose = require("mongoose");
const userModel = mongoose.Schema(
  {
    username: { type: String, required: true, unique:true },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
    ratings : {
      type:Array,
      default:[],
    },
    watchLaterList : {
      type:Array,
      default:[],
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", userModel);
