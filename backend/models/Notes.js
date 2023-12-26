const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
   title: {
    type : String,
    required: true  // this means that the field is mandatory to fill in. If it's not filled in, an error will be
   },
   description:{
    type : String,
    required : true,
   },
   tag : {
    type : String,
    default : "General"
   },
   date : {
    type : Date,
    default : Date.now
   },
  });

  module.exports = mongoose.model("user" , notesSchema)