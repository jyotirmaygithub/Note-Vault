const user = require("../models/User")
const express = require('express')
const router = express.Router()

// through this file we will gonna deal with login and sign up of the user
router.get('/',(req,res)=>{
    
    // res.json([])
    //res we use to send things 
    // req.body will be assessible only through middleware
    console.log(req.body)
    res.send(req.body)
    const userdata = user(req.body)
    // broadly by using user(req.body) we are sending the data into the schema which we made and after checking the data we are storing it in const userdata
    userdata.save()
    // this save function which led to the save of the data in mongo  db
})

module.exports = router

// Note : password shouldnot be store in the plain text