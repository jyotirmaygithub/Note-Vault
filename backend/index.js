const connectToMongo = require('./db')
const express = require('express')

connectToMongo();
const app = express()
const port = 3000

app.use(express.json()) // we are using middle ware by writing this code

// available routes in the project
// by using these endpoints or paths we will be able to show data 
app.use("/api/auth" , require('./routes/auth'))
app.use("/api/notes" , require("./routes/notes") )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})