const movie = require("../models/movie");
const movieModel = require("../models/movie");
const router = require("express").Router();
const verifyToken = require("../verifyToken");

router.post("/", verifyToken, async (req, res) => {
  
    try {
      const newMovie = new movieModel(req.body);
      res.status(200).json(await newMovie.save());
    } catch (err) {
      res.status(500).json(err);
    }
 
  
});

router.put("/:id", verifyToken, async (req, res) => {

    try {
      const updatedMovie = await movieModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  
});

router.delete("/:id", verifyToken, async (req,res) => {
  if(req.user.isAdmin){
    try {
      await movieModel.findByIdAndDelete(req.params.id); 
      res.status(200).json("deleted");
    } catch (err) {
      res.status(500).json(err);
    }
    
  } else {
    res.status(500).json("need admin rights");
  }
});

router.get("/find/:id", verifyToken, async (req, res) => {
  try {
    const movie = await movieModel.findById(req.params.id);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/random", verifyToken, async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
      movie = await movieModel.aggregate([
        { $match: { type: type } },
        { $sample: { size: 10 } },
      ]);
    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/top-rated", verifyToken, async (req, res) => {
  const typeQuery = req.query.type; // Get the type query parameter
  const genreQuery = req.query.genre;
  
  try {
    let query = {};

    if (typeQuery) {
      query.type = typeQuery;
    }

    if (genreQuery) {
      query.genre = genreQuery;
    }

    const topMovies = await movieModel.find(query).sort({ totalRating: -1 }).limit(10);
    res.status(200).json(topMovies);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/recent", verifyToken, async (req, res) => {
  const typeQuery = req.query.type;
  try {
    let movies;
    if (typeQuery) {
      movies = await movieModel.find({ type: typeQuery })
        .sort({ date: -1 })
        .limit(5); // Adjust the limit as necessary
    } else {
      movies = await movieModel.find()
        .sort({ date: -1 })
        .limit(5); // Adjust the limit as necessary
    }
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/",  async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  if(typeQuery){
    try {
      if(genreQuery){
        list = await movieModel.aggregate([
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
        res.status(200).json(list);
      } else {
        list = await movieModel.aggregate([
          { $match: { type: typeQuery} },
        ]);
        res.status(200).json(list);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    try {
      list = await movieModel.find();
      res.status(200).json(list.reverse());
    } catch (err) {
      res.status(500).json(err);
    }
  }
    
});

module.exports = router;

