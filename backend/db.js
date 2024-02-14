const mongoose = require("mongoose");

function ConnectionToMongoose() {
    mongoose
        .connect("mongodb+srv://jyotirmay2000gupta:8NMeAayQWCn7rjs@cluster0.lyj7haa.mongodb.net/test?retryWrites=true&w=majority", {
             useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("Connection done......!!!!!"))
        .catch((err) => console.error("Connection error:", err));
}

module.exports = ConnectionToMongoose;
