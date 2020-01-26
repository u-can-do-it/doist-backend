const bcrypt = require("bcryptjs");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = { ...req.body };
  let user = await User.findOne({ email: email });
  if (user) return res.status(400).send("User already registered.");

  user = new User({
    email: email,
    password: password
  });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);

  await user.save();
  const token = user.generateUserAuthToken();
  res
    .header("x-auth-token", token)
    .send({ email: user.email, _id: user._id, token: token });
});

module.exports = router;
