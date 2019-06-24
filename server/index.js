require("dotenv").config();
const port = 3000;

const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");

const app = express();

const handle = require("./handlers/index");
const routes = require("./routes");
const db = require("./models");

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
  res.json({ hello: "world" });
});

app.use("/anhar/auth", routes.auth);
app.use("/anhar/polls", routes.poll);

app.use(handle.notFound);
app.use(handle.errors);
