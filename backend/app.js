const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/api/outfit", async (req, res) => {
  // We will retrieve from Mongo
  const outfitsJson = [
    {
      id: "qwer",
      image_url:
        "https://theimpression.com/wp-content/uploads/2019/03/celine-rf19-1201.jpg",
      label: "Black",
      details: ["hat", "black"],
      last_worn: new Date("2022-10-31T12:00"),
    },
    {
      id: "fsafds",
      image_url:
        "https://www.boredpanda.com/blog/wp-content/uploads/2022/03/horrible-dresses-25-622749b4cfad9__700.jpg",
      label: "sun god",
      details: ["sun", "black"],
      last_worn: new Date("2022-11-01T12:00"),
    },
    {
      id: "al",
      image_url:
        "https://assets.vogue.com/photos/5d77fd188d44ee0009799518/master/pass/00001-Cong-Tri-Ready-To-Wear-Spring-2020.jpg",
      label: "White dress",
      details: ["pink", "umbrella"],
      last_worn: new Date("2022-11-01T12:30"),
    },
    {
      id: "asdfdasf",
      image_url:
        "https://i.pinimg.com/originals/6a/c3/fe/6ac3fe0fcc2108847c9e107a5b2305cd.jpg",
      label: "Pink dress",
      details: ["pink", "umbrella"],
      last_worn: new Date(),
    },
  ];

  res.json({
    success: outfitsJson,
    error: false,
  });
});

app.listen(3000);
