//@ts-check

const express = require('express')
const app = express()
const MainoffersController = require('./controller/MainOffersController')
const helmet = require('helmet')
const path = require('path');









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


 app.use(helmet())


app.use(express.json())








  app.post('/dnbo-dte/api/v1/PresentOffers',MainoffersController.presentOffers);
  // app.get('/dnbo-dte/api/v1/PresentOffers/:msisdn/oudkniss',)
  // app.get('/dnbo-dte/api/v1/PresentOffers/:msisdn/facebook')
  // app.get('/dnbo-dte/api/v1/PresentOffers/:msisdn/')


  app.post('/dnbo-dte/api/v1/AcceptOffer',MainoffersController.acceptOffer);

 // app.post('/dnbo-dte/api/v1/upload',dataController.saveFile);
  


  


  app.listen(3000, ()  => {
    console.log('DNBO API-Manger is up and running' );
});

// docker tag local-image:tagname new-repo:tagname

// docker push new-repo:tagnamedockerabdm