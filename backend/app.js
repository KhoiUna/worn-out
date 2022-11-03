require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const OutfitUtil = require("./utils/OutfitUtil");

app.use(cors());

//initial server
app.get("/api/outfit", async (req, res) => {
  const date = req.query.date;

  const outfits = await OutfitUtil.get(date);

  res.json({
    success: outfits,
    error: false,
  });
});

// express listening
app.listen(3000, () =>
  console.log(`Server is running: http://localhost:3000/`)
);
