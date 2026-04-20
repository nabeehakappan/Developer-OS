const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// GET NOTES
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.notes || { content: "" });
});

// SAVE NOTES
router.post("/", auth, async (req, res) => {
  const { content } = req.body;

  const user = await User.findById(req.user.id);
  user.notes = { content };

  await user.save();

  res.json({ msg: "Saved" });
});

module.exports = router;