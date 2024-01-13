//! require mongoose
const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")

//! connect to Database
mongoose.connect("mongodb://127.0.0.1:27017/passchackerchek");

//! Create useSchema
const userSchema = mongoose.Schema({
  username:String,
  // password:String,
  pic:String, 
});

userSchema.plugin(plm);


module.exports = mongoose.model("users", userSchema);

