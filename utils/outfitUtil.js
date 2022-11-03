const { query } = require("express");
const { ObjectId } = require("mongodb");

//Reference to MongoDB connection at ../db/client
const client = require("../db/client");

 //conection to db and specific collection
 const collection = client.db("wornout").collection("outfits");



//outfitUtil Reference HERE
module.exports = class outfitUtil {

    static async create(outfitData) {
        try {
          //inserts outfit Data
          outfitData.image_url = outfitData.image_url.trim();
          outfitData.label = outfitData.label.trim();
          outfitData.details = outfitData.details.trim();
          outfitData.last_worn = outfitData.last_worn.trim();

          const collection = client.db("wornout").collection("outfits");

          const response = await collection.insertOne(outfitData);
    
          if (!response) throw new Error("Error saving outfit");
    
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }
  
};
