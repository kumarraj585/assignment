const express = require("express");
const Task = require("../models/Task");
const auth = require("../middlewares/authMiddleware");

const router = express.Router();

/* CREATE */
router.post("/", auth, async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    userId: req.user.id,
  });
  res.json(task);
});

/* READ */
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
});

/* UPDATE */
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    { title: req.body.title },
    { new: true }
  );
  res.json(task);
});

/* DELETE */
router.delete("/:id", auth, async (req, res) => {
  await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });
  res.json({ message: "Task deleted" });
});

module.exports = router;
