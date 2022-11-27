require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const OutfitUtil = require("./utils/OutfitUtil.cjs");

const PORT = process.env.PORT || 3000;

// Serve the built React frontend
app.use(express.static(path.join(__dirname, "..", "frontend/dist")));

// Initialize server & middleware
app.use(express.json());

app.get("/api/uniqueDates", async (req, res) => {
  const dates = await OutfitUtil.getUniqueDates();

  res.json({
    success: dates,
    error: false,
  });
});

app.get("/api/outfit", async (req, res) => {
  const date = req.query.date;

  const outfits = await OutfitUtil.get(date);

  res.json({
    success: outfits,
    error: false,
  });
});

app.get("/api/outfit/:outfitID", async (req, res) => {
  const outfit = await OutfitUtil.getOne(req.params.outfitID);

  res.json({
    success: outfit,
    error: false,
  });
});

app.post("/api/outfit/save", async (req, res) => {
  const response = await OutfitUtil.saveOutfit(req.body);

  if (!response) console.error(response);

  res.json({
    success: true,
    error: false,
  });
});

app.delete("/api/outfit/delete/:outfitID", async (req, res) => {
  const response = await OutfitUtil.deleteOutfit(req.params.outfitID);

  if (!response) console.error(response);

  res.json({
    success: true,
    error: false,
  });
});

app.put("/api/outfit/update/:outfitID", async (req, res) => {
  const response = await OutfitUtil.updateOne(req.params.outfitID, req.body);

  if (!response) console.error(response);

  res.json({
    success: true,
    error: false,
  });
});

//
app.use("*", express.static(path.join(__dirname, "..", "frontend/dist")));

// Express listening
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
