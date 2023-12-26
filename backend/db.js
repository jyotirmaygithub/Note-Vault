// this below syntax we are using to get connect to the mongodb database
const mongoose = require("mongoose");

function Connectiontomongoose(){
    mongoose
      .connect("mongodb://localhost:27017/jyotirmay", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connection done......!!!!!"))
      .catch((err) => console.log(err));
}

module.exports = Connectiontomongoose
