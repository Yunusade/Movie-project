const express = require("express");
const app = express();
const usersRouter = require("../routes/User")
const showsRouter = require("../routes/Shows")

app.use("/users", usersRouter)
app.use("/shows", showsRouter)

app.get("/", (req, res) => {
  res.send("Movie Project")
})

module.exports = app