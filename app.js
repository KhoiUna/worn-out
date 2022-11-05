require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const OutfitUtil = require("./utils/OutfitUtil");

const PORT = process.env.PORT || 3000;


// init app & middleware
app.use(cors());
app.use(express.json());

//initial server
app.get("/api/outfit", async (req, res) => {
  const date = req.query.date;

  const outfits = await OutfitUtil.get(date);

  res.json({
    success: outfits,
    error: false,
  });
});

app.post("/api/outfit", async (req, res) => {

 const response = await OutfitUtil.saveOutfit(req.body);    


  if (!response) console.error(response);

  res.json({
    success: response,
    error: false,
  });
});




// express listening
app.listen(PORT, () =>
  console.log(`Server is running: http://localhost:3000/`)
);
