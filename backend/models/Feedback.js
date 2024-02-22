const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feedBack = new Schema({
   user:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'user'
  },
   title : {
    type : String,
    required: true  
   },
   message : {
    type : String,
    required : true,
   },
   date : {
    type : Date,
    default : Date.now
   },
  });
  const FeedBack = mongoose.model("feedback" , feedBack)
  module.exports = FeedBack;