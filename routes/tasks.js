const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

const { Task, validate } = require("../models/task");

// add new task
router.post("/", async (req, res) => {
  let task = {
    ...req.body,
    user: req.user._id
  };

  const { error } = validate(task);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    task = new Task({ ...task });
    task = await task.save();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get all user tasks
router.get("/", async (req, res) => {
  try {
    const task = await Task.find({ user: req.user });
    res.send(task);
  } catch (error) {
    res.status(404).send("No task with given id");
  }
});

// Get user task by id
router.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (String(task.user._id) === String(req.user._id)) {
      res.send(task);
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(404).send("No task with given id");
  }
});

// edit task.
router.put("/:id", async (req, res) => {
  try {
    validate(req.body);
  } catch (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  try {
    const task = await Task.updateOne({ _id: req.params.id }, { ...req.body });
    res.send(task);
  } catch (error) {
    return res.status(404).send("No task with given id");
  }
});

router.delete("/:id", async (req, res) => {
  const task = await Task.findByIdAndRemove(req.params.is);

  if (!task) {
    return res.status(404).send("No task with given id");
  }

  res.send(task);
});

module.exports = router;
