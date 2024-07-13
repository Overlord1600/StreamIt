const userModel = require("../models/user");
const router = require("express").Router();
const crypto = require("crypto-js");
const verifyToken = require("../verifyToken");

router.put("/:id", verifyToken, async (req, res) => {
  if (req.user.id === req.params.id) {
    if (req.body.password) {
      req.body.password = crypto.AES.encrypt(
        req.body.password,
        process.env.KEY
      ).toString();
    }
    try {
      const updatedUser = await userModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    req.status(500).json("Error occured");
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  if (req.user === req.params.id || req.user.isAdmin) {
    try {
      await userModel.findByIdAndDelete(req.params.id);
      res.status(200).json("deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json("no delete");
  }
});

router.get("/find/:id", async (req, res) => {
  try {
    const foundUser = await userModel.findById(req.params.id);
    const { password, ...data } = foundUser._doc;
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/", verifyToken, async (req, res) => {
    try {
      const userList =  
         userModel.find();
      res.status(200).json(userList);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
