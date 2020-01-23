const mongoose = require("mongoose");
const Joi = require("joi");
Joi.ObjectId = require("joi-objectid")(Joi);

const archivedTaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255
  },
  archived: {
    type: Boolean,
    default: true
  },
  deadline: {
    type: Date
  },
  order: {
    type: Number
  },
  dateCompleted: Date
});

const ArchivedTask = mongoose.model("ArchivedTask", archivedTaskSchema);

function validateArchivedTask(task) {
  const schema = {
    user: Joi.ObjectId().required(),
    name: Joi.string()
      .min(4)
      .required(),
    deadline: Joi.date(),
    archived: true,
    order: Joi.number(),
    dateCompleted: Joi.date()
  };
  return Joi.validate(task, schema);
}

exports.archivedTask = ArchivedTask;
exports.validate = validateArchivedTask;