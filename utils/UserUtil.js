const { query } = require("express");
const { ObjectId } = require("mongodb");

//Reference to MongoDB connection at ../db/client
const client = require("../db/client");

 //conection to db and specific collection
 const collection = client.db("NotesDB").collection("Quebec");



//UserUtil Reference HERE
module.exports = class UsersUtil {
  
};
