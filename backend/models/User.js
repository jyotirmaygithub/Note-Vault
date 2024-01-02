const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userDetails = new Schema({
   name : {
    type : String,
    required: true  // this means that the field is mandatory to fill in. If it's not filled in, an error will be
   },
   email:{
    type : String,
    required : true,
    unique : true,
   },
   password : {
    type : String,
    required : true,
   },
   date : {
    type : Date,
    default : Date.now
   },
  });
  const User = mongoose.model("user" , userDetails)
  User.createIndexes();
  // We are exporting the user so that we can check all potential database insert data
  module.exports = User;