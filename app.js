const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const logger = require('morgan');
const offersController = require('./controller/OffersController')
const dataController = require('./controller/DataController')
const fs = require('fs');
const helmet = require('helmet')


require('dotenv').config();




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
//app.use(fileUpload)

app.use(logger('common', {
    stream: fs.createWriteStream('./logs.log', {flags: 'a'})
}));
 app.use(helmet())



app.use(bodyParser.json());

// satrt  end point API 
app.get('/dnbo-dte/api/v1',(req,res)=>{


    res.status(201).json({
      message : " DNBO API is working",
    
    });
  
  })



  app.post('/dnbo-dte/api/v1/PresentOffers',offersController.presentOffers);


  app.post('/dnbo-dte/api/v1/Acceptoffer',offersController.acceptOffer);

  app.post('/dnbo-dte/api/v1/upload',dataController.saveFile);
  


  


  app.listen(3000, ()  => {
    console.log('DNBO listening on port ' + 3000);
});

