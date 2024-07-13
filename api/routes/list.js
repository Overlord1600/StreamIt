const router = require('express').Router();
const { default: axios } = require('axios');
const listModel = require('../models/list');
const verifyToken = require("../verifyToken");

router.post("/", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const newList = new listModel({
        title: req.body.title,
        type: req.body.type,
        genre: req.body.genre,
        content: req.body.content 
      });
      console.log(newList);
      const savedList = await newList.save();
      res.status(201).json(savedList);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await listModel.findByIdAndDelete(req.params.id);
      res.status(201).json("The list has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

router.get("/", verifyToken, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await listModel.aggregate([
        
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await listModel.aggregate([
       
          { $match: { type: typeQuery } },
        ]);
      }
      
    } else {
      if(genreQuery){
        list = await listModel.aggregate([{$match : {genre:genreQuery}}])
      } else {
        list = await listModel.aggregate([{ $sample: { size: 10 } }]);
      }
      
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
