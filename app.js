require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
//Reference used for class UserUtil where all CRUD function are stored
const UsersUtil = require("./utils/UserUtil");
const app = express();

const { PORT = 3000 } = process.env;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static"));
app.set("view engine", "ejs");


//initial reply
app.get("/", async (req, res) => {
  res.render("../views/index.ejs");
});

//view selected outfit
app.post("/thisFit", (req, res) => {
  res.render("../views/outfit.ejs")
})

//create outfit button
app.post("/newFit", (req, res) => {
  res.render("../views/newoutfit.ejs")
})

app.post("/create", async (req, res) => {
  //UsersUtil References create function in ./utils/UserUtil
    const response = await UsersUtil.create(req.body);
  
    if (!response) console.error(response);
  
    res.redirect("/");
  });
  
//Listening
app.listen(PORT, () =>
  console.log(`Server is running: http://localhost:${PORT}/`)
);