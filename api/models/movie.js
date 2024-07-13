const mongoose = require("mongoose");

const episodeModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    video :{
      type:String,
      required : true,
    }
  },
  { _id: false } 
);

const movieModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    titleImage: {
      type: String,
      required: true,
    },
    totalRating: {
      type: Number,
      default: 0,
      required: true,
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
      required: true,
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
    poster: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    episodes: {
      type: [episodeModel],
      default: [],
    },
  },
  { timestamps: true }
);

movieModel.pre('save', function (next) {
  if (this.type === "Series") {
    if (!this.episodes) {
      this.episodes = [];
    }
  } else {
    this.episodes = undefined;
  }
  next();
});

module.exports = mongoose.model("Movie", movieModel);
