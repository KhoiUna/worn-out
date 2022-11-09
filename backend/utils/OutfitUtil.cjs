//Reference to MongoDB connection at ../db/client
const { ObjectId } = require("mongodb");
const client = require("../db/client.cjs");

module.exports = class OutfitUtil {
  static async getUniqueDates() {
    try {
      const collection = client.db("wornout").collection("outfits");

      const dates = (await collection.distinct("last_worn")).sort(
        (a, b) => new Date(b) - new Date(a)
      );
      if (!dates) return false;

      return dates;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

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

  static async getOne(outfitId) {
    try {
      const collection = client.db("wornout").collection("outfits");

      const filter = { _id: ObjectId(outfitId) };

      const outfit = await collection.findOne(filter);
      if (!outfit) return false;

      return outfit;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // Inserts outfit Data
  static async saveOutfit(outfitData) {
    try {
      outfitData.image_url = outfitData.image_url.trim();
      outfitData.label = outfitData.label.trim();
      outfitData.details = outfitData.details.split(",");

      outfitData.last_worn = new Date(outfitData.last_worn.trim());
      outfitData.last_worn = new Date(
        outfitData.last_worn.getFullYear(),
        outfitData.last_worn.getMonth(),
        outfitData.last_worn.getDate(),
        1,
        0,
        0
      );

      const collection = client.db("wornout").collection("outfits");

      const response = await collection.insertOne(outfitData);

      if (!response) throw new Error("Error saving outfit");

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  static async deleteOutfit(outfitId) {
    try {
      // Connect to a collection using the client connection object created in ../db/client.js
      const collection = client.db("wornout").collection("outfits");

      // Use this collection to delete one user if the _id in Mongo matches the userId from request
      const response = await collection.deleteOne({
        _id: ObjectId(outfitId),
      });

      // Throw an error if there is no response
      if (!response) throw new Error("Error deleting outfit");

      // Return true if succeeded
      return true;
    } catch (error) {
      // Error thrown above will be shown here
      console.error(error);

      // Return false if failed
      return false;
    }
  }

  static async updateOne(outfitId, outfitData) {
    try {
      const collection = client.db("wornout").collection("outfits");

      const filter = { _id: ObjectId(outfitId) }; // pass in outfitId

      // update the key 'label' with the new name from userData
      const updateDoc = {
        $set: {
          image_url: outfitData.image_url,
          label: outfitData.label,
          details: outfitData.details,
          last_worn: outfitData.last_worn,
        },
      };

      const response = await collection.updateOne(filter, updateDoc);

      if (!response) throw new Error("Error deleting outfit");

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
};
