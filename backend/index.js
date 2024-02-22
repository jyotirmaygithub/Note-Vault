const connectToMongo = require("./db");
const express = require("express");
var cors = require("cors");

connectToMongo();
const app = express();
const port = 5000;

// When we make an HTTP request from a web page to a different domain, the browser will, by default, block the request for security reasons. The cors middleware helps in enabling that HTTP request.
app.use(cors());

app.use(express.json()); // we are using middle ware by writing this code

// available routes in the project
// by using these endpoints or paths we will be able to show data
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/feedBack", require("./routes/feedBack"));

app.listen(port, () => {
  console.log(`Note-Keeper app listening on port ${port}`);
});
