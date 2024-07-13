const router = require("express").Router();
const userModel = require("../models/user");
const crypto = require("crypto-js");
const JWT = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    
    const existingUser = await userModel.findOne({ 
      $or: [
        { email: req.body.email }, 
        { username: req.body.username }
      ]
    });
    
    if (existingUser) {
      return res.status(400).json("Email or username already exists");
    }
    
    
    const newUser = new userModel({
      username: req.body.username,
      email: req.body.email,
      password: crypto.AES.encrypt(
        req.body.password,
        process.env.KEY
      ).toString(),
      isAdmin: req.body.isAdmin ? req.body.isAdmin : false
    });
    
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const foundUser = await userModel.findOne({ email: req.body.email });
    if (!foundUser) {
      res.status(404).json("Invalid Credentials");
    } else {
      const bytes = crypto.AES.decrypt(foundUser.password, process.env.KEY);
      const userPassword = bytes.toString(crypto.enc.Utf8);
      if (userPassword === req.body.password) {
        const token = JWT.sign(
          { id: foundUser._id, isAdmin: foundUser.isAdmin },
          process.env.KEY,
        );
        const { password, ...userData } = foundUser._doc;
        res.status(200).json({ userData, token });
      } else {
        res.status(404).json("Invalid Credentials");
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
