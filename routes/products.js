const express = require("express");
const User = require("../models/user");
const productRouter = express.Router();

// upload Image
productRouter.get('/home',(req, res)=>{
    let users= []
 User.find().then(usersDoc=>{
    console.log(usersDoc[0])
    users= usersDoc
    res.render("home",{"users":users});


 })

  });


module.exports = productRouter;
