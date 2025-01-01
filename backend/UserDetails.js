const mongoose = require("mongoose");

// Schéma Mongoose pour un groupe
const UserDetailsSchema = new mongoose.Schema({
  username:String,
  email: { type:String, unique: true},
  password:String,
  telephone: String
},
{
  collection:"UserInfo"
});

// Modèle Mongoose
module.exports = mongoose.model("UserInfo", UserDetailsSchema);
