const mongoose = require("mongoose");
const movieModel = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    titleImage : {
      type:String,
      required: true
    },
    totalRating : {
      default:0,
      type:Number,
      required : true,
    },
    rating: {
      type: Array,
      
    },
    time: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required:true,
    },
    tags: {
      type: String,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    poster : {
      type : String,
    },
    type : {
      type:String,
      required:true,
    },
    
  },
  { timestamps: true }
);
module.exports = mongoose.model("Movie", movieModel);
