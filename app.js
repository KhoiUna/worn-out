require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const UsersUtil = require("./utils/UserUtil");

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    res.render("index");
  });

app.listen(PORT, () =>
  console.log(`Server is running: http://localhost:${PORT}/`)
);