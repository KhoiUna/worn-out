require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();

const OutfitUtil = require("./utils/OutfitUtil.cjs");

const PORT = process.env.PORT || 3000;

// Serve the built React frontend
app.use(express.static(path.join(__dirname, "..", "frontend/dist")));

app.get("/api/outfit", async (req, res) => {
  const date = req.query.date;

  const outfits = await OutfitUtil.get(date);

  res.json({
    success: outfits,
    error: false,
  });
});

// Express listening
app.listen(PORT, () =>
  console.log(`Server is running: http://localhost:${PORT}/`)
);
