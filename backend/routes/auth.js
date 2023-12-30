const user = require("../models/User")
const express = require('express')
const router = express.Router()

// through this file we will gonna deal with login and sign up of the user
router.post('/',(req,res)=>{
    
    // res.json([])
    //res we use to send things 
    // req.body will be assessible only through middleware
    console.log(req.body)
    res.send(req.body)
    const userdata = user(req.body)
    // broadly by using user(req.body) we are sending the data into the schema which we made and checking it then, we are storing it into the variable which we have 
    userdata.save()
    // this save function which led to the save of the data in mongo  db
    
})

module.exports = router

// Note : password shouldnot be store in the plain text