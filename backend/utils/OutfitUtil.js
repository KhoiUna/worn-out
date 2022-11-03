//Reference to MongoDB connection at ../db/client
const client = require("../db/client");

//outfitUtil Reference HERE
module.exports = class OutfitUtil {
  static async get(date) {
    try {
      const collection = client.db("wornout").collection("outfits");

      const filter = { last_worn: new Date(date) };

      const outfits = collection.find(filter).toArray();
      if (!outfits) return false;

      return outfits;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // static async create(outfitData) {
  //   try {
  //     //inserts outfit Data
  //     outfitData.image_url = outfitData.image_url.trim();
  //     outfitData.label = outfitData.label.trim();
  //     outfitData.details = outfitData.details.trim();
  //     outfitData.last_worn = outfitData.last_worn.trim();

  //     const collection = client.db("wornout").collection("outfits");

  //     const response = await collection.insertOne(outfitData);

  //     if (!response) throw new Error("Error saving outfit");

  //     return true;
  //   } catch (error) {
  //     console.error(error);
  //     return false;
  //   }
  // }
};
