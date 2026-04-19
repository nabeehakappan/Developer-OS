const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// GET CONFIG
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.desktopConfig || {});
});

// SAVE CONFIG
router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  user.desktopConfig = req.body;

  await user.save();

  res.json({ msg: "Saved" });
});

module.exports = router;