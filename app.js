console.log("DNBO is here ")

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors');
const Networks = require('./services/NetworkService')
const DataService = require('./services/DataService')

const networkService = new Networks()
const dataService = new DataService()
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

  app.post('/Evolving/Api/Evolution/PresentOffers',async  (req,res)=>{

      const reqdata = req.body
      try {
        var dataOffers05 =  await networkService.getOffers05(reqdata)
        var dataOffers10  = await networkService.getoffers01(reqdata)
        console.log(dataOffers10.data)

        const data05 = dataService.labeleOffers(dataOffers05.data,'static')
        //const data10 = dataService.labeleOffers(dataOffers10.data,'dynamic')
       // const dataMerged = dataService.mergeOffers(data05,data10)
  


     //  dataService.mergeOffers(dataOffers05.data,data)

     res.status(200).send(data05)

      }  catch(err){

        
        res.status(500).json({
         
          message : err.message
        })
         
        

      }

      
       
 
//orascom2014++ 

});


app.post('/Evolving/Api/Evolution/Acceptoffer',async  (req,res)=>{

  const reqdata = req.body
  try {
    
   if ( reqdata.RouteName === "static") {


    await networkService.acceptOffer05(reqdata)

   } else if  ( reqdata.RouteName === "dynamic") {


    await networkService.acceptOffer10(reqdata)
   }
    

 res.status(200)

  }  catch(err){

    
    res.status(500).json({
     
      message : "somthing goes wrong "
    })
     
    

  }

  
   

//orascom2014++ 

});
  



  app.listen(3000, ()  => {
    console.log('app listening on port ' + 3000);
});

//curl -v -u Djezzy_dnbo_user:orascom2014++ -H "content-type:application/json"  -X POST http://172.16.64.42:15558/Evolving/Api/Evolution/PresentOffers -d {"msisdn":783605591,"channel_id":3}
//dnbo10
//curl -H "content-type:application/json" -X POST http://172.16.64.98:6061/dnbo-engine/PresentOffers -d {msisdn:783605591,channel_id:3,sales_channel_id:3}