const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
const offersController = require('./controller/OffersController')
require('dotenv').config();





app.use(cors()) 



app.use((req,res,next)=> {
  res.setHeader("Access-Control-Allow-Origin" ,"*");
  res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type , Accept"
  );
  res.setHeader(
      "Access-Control-Allow-Methods",
      "GET ,POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


app.use(bodyParser.json());


app.get('/api/v1',(req,res)=>{


    res.status(201).json({
      message : " DNBO API is working",
    
    });
  
  })



  app.post('/Evolving/Api/Evolution/PresentOffers',offersController.presentOffers);


  app.post('/Evolving/Api/Evolution/Acceptoffer',offersController.acceptOffer );
  



  app.listen(3000, ()  => {
    console.log('app listening on port ' + 3000);
});

