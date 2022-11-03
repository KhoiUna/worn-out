//require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

//const bodyParser = require("body-parser");
//Reference used for class UserUtil where all CRUD function are stored
const outfitUtil = require("./utils/outfitUtil");

app.use(cors());



//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("static"));
//app.set("view engine", "ejs");

//initial server
app.get("/api/outfit", async (req, res) => {
     // No idea bro
     const outfitsJson = [  

      {
        "id": req.body.id,
        "image_url": req.body.image_url,
        "label": req.body.label,
        "details": req.body.details,
        "last_worn": req.params.last_worn,

      }
    ];
        
    res.json({
      success: outfitsJson,
      error: false,
    });
  });
//will serve Outfit page
/*app.post("/thisOutfit", (req, res) => {
  console.log("made it to function")
  res.render("../view/outfits.ejs")
}) */

// express listening
app.listen(3000, () =>
  console.log(`Server is running: http://localhost:3000/`)
);