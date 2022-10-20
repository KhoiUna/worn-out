const { ObjectId } = require("mongodb");
const client = require("../db/client");

module.exports = class UsersUtil {

    collection = client.db("test").collection("notes");

  
};
