const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const config = require("config");

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  console.log(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password");

  const isPasswordValid = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordValid)
    return res.status(400).send("Invalid email or password");

  const token = user.generateUserAuthToken();
  console.log(token);
  res
    .set("x-auth-token", token)
    .send({ email: user.email, _id: user._id, token: token });
});

module.exports = router;
