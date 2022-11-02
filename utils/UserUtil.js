const { query } = require("express");
const { ObjectId } = require("mongodb");

//Reference to MongoDB connection at ../db/client
const client = require("../db/client");

 //conection to db and specific collection
 const collection = client.db("test").collection("users");



//UserUtil Reference HERE
module.exports = class UsersUtil {

    static async create(userData) {
        try {
          //inserts userData
          const response = await collection.insertOne(userData);
    
          if (!response) throw new Error("Error saving user");
    
          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }
  
};
