const authorisation = require("./middleware/auth");
const cors = require("cors");
const mongoose = require("mongoose");
const users = require("./routes/users");
const tasks = require("./routes/tasks");
const auth = require("./routes/auth");
const express = require("express");
const config = require("config");
const app = express();

require("./startup/prod")(app);

if (!config.get("jwtPrivateKey")) {
  console.error("ERROR: JWT key is not defined");
  process.exit(1);
}

mongoose
  .connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected..."))
  .catch(err => console.log("DB not connected"));

app.use(cors());
app.use(express.json());
app.use("/api/tasks", [authorisation], tasks);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
