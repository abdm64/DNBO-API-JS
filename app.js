const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan');
const offersController = require('./controller/OffersController')
const fs = require('fs');
const helmet = require('helmet')
const xss = require('xss')
require('dotenv').config();







app.use(logger('common', {
    stream: fs.createWriteStream('./logs.log', {flags: 'a'})
}));
 app.use(helmet())
//  app.use(xss)


// app.use(   morgan('combined', { stream: accessLogStream }, {
//   skip: function (req, res) { return res.statusCode === 200 }
// } ))


// app.use( morgan('combined', {
//   skip: function (req, res) { return res.statusCode < 400 }
// } ))



app.use(bodyParser.json());

// satrt  end point API 
app.get('/dnbo-dte/api/v1',(req,res)=>{


    res.status(201).json({
      message : " DNBO API is working",
    
    });
  
  })



  app.post('/dnbo-dte/api/v1/PresentOffers',offersController.presentOffers);


  app.post('/dnbo-dte/api/v1/Acceptoffer',offersController.acceptOffer);
  


  


  app.listen(3000, ()  => {
    console.log('DNBO listening on port ' + 3000);
});

