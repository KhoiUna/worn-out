const express = require("express");
const app = express();
const bodyParser = require("body-parser");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    res.render("../view/index.ejs");
  });


app.listen(3000, () =>
  console.log(`Server is running: http://localhost:3000/`)
);