const mongoose = require("mongoose");
const Joi = require("joi");
Joi.ObjectId = require("joi-objectid")(Joi);

const taskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  },
  archived: {
    type: Boolean,
    default: false
  },
  deadline: {
    type: Date
  },
  order: {
    type: Number
  },
  dateCompleted: Date
});

const Task = mongoose.model("Task", taskSchema);

function validateTask(task) {
  const schema = {
    user: Joi.ObjectId().required(),
    name: Joi.string()
      .min(1)
      .required(),
    deadline: Joi.date(),
    archived: Joi.boolean(),
    order: Joi.number(),
    dateCompleted: Joi.date()
  };
  return Joi.validate(task, schema);
}

exports.Task = Task;
exports.validate = validateTask;
