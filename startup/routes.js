const express = require("express");
const auth = require("../routes/auth");
const seances = require("../routes/seances");
const users = require("../routes/users");

module.exports = function(app) {
  app.use(express.json());
  app.use("/api/auth", auth);
  app.use("/api/seances", seances);
  app.use("/api/users", users);
};
