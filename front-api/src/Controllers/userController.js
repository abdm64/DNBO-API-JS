const mongoose = require('mongoose')
const express =require('express');
const app = express.Router();
const jwt = require("jsonwebtoken");
require('../Models/user')
require('dotenv').config();
const User = mongoose.model('user')
var bcrypt   = require('bcryptjs');
const TOKEN = process.env.TOKEN





//sign the user

app.post('/dnbo/api/v1/sign',(req,res)=> {
    bcrypt.hash(req.body.password, 10).then(hash => {
       req.body.password = hash
      let user = new User(req.body)
      user.save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err.message,
        });
      });
       
      });
      
      

    
  
   

})



//get the user get logged


app.post('/dnbo/api/v1/login',(req,res)=> {

    let fetchedUser;
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password);
      })
      .then(result => {
        if (!result) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        const token = jwt.sign(
          { email: fetchedUser.email, userId: fetchedUser._id },
         TOKEN,
          { expiresIn: "4h" }
        );
        res.status(200).json({
          message: ' login success',
          token: token
        });
      })
      .catch(err => {
          
        return res.status(401).json({
          message: err.message
        });
      });
  

})


module.exports = app;