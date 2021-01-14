//@ts-check

const express = require('express')
const app = express()
const logger = require('morgan');
const offersController = require('./controller/OffersController')
const dataController = require('./controller/DataController')
const fs = require('fs');
const helmet = require('helmet')
const path = require('path');
const pino = require('pino-http')({

})









require('dotenv').config();



app.use(express.static(__dirname + './static'))
//serve
app.get('/dnbo-dte', function(req, res) {
 
    res.sendFile(path.join(__dirname, './static/index.html'), (err) => {

      if (err) {
        res.status(500).send(err)
      }
    })
  })

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


app.use(express.json())








  app.post('/dnbo-dte/api/v1/PresentOffers',offersController.presentOffers);


  app.post('/dnbo-dte/api/v1/Acceptoffer',offersController.acceptOffer);

  app.post('/dnbo-dte/api/v1/upload',dataController.saveFile);
  


  


  app.listen(3000, ()  => {
    console.log('DNBO listening on port ' + 3000);
});

// docker tag local-image:tagname new-repo:tagname

// docker push new-repo:tagnamedockerabdm