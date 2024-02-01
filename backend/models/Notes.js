const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
   user:{
      type: mongoose.Schema.Types.ObjectId, // it is a mongoose data type to take document id.
      ref: 'user'
  },
  username:{
   type: String,
   required: true
  },
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
  const Notes = mongoose.model("notes" , notesSchema)
  module.exports = Notes