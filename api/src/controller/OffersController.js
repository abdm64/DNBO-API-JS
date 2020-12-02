//@ts-check

const networkService = require('../services/NetworkService')
const dataService = require('../services/DataService')
const redisService = require('../services/RedisService')
const filterData = require('../UploadsManager/filterData')





exports.presentOffers = async (req,res,next) =>{
  
let msisdn = req.body.msisdn
const channel_id = parseInt(req.body.channel_id) 
    const reqdata = {
      msisdn : parseInt(req.body.msisdn),
      channel_id : parseInt(req.body.channel_id) ,
      language : req.body.language
    }
 
    const reqPrams =  req.query
    
 // if channel id enter 
 // let redisData = await  redisService.getValue(msisdn)
if ( channel_id === 18  ) {
//   let jsonData = JSON.parse(redisData)
 
  
//   let static =    filterData.filterPostion(jsonData.static,reqPrams) 
// dataService.typeData(static,jsonData.dynamic,res,parseInt(reqPrams.type))
 
} else {




    
    try {

      const dataOffers05 =  await networkService.getOffers05(reqdata)
      const dataOffers10  = await networkService.getoffers01(reqdata)
   
      let sendData = {
          msisdn: msisdn,
          dataOffers05:dataOffers05,
          dataOffers10:dataOffers10,
          res:res,
          reqPrams:reqPrams,
          channel_id:channel_id
      }
     // dataService.switchData(msisdn,dataOffers05,dataOffers10,res,reqPrams)
      dataService.switchData(sendData)
    
     


    }  catch(err){
      console.log(err)

      res.status(500).json({
        message: "Task failed successfully "
      })
       
      

    }
  }
}

exports.acceptOffer = async (req,res)=>{

    const reqdata = req.body
    const offer10 = dataService.checkOffer10(reqdata.offer_id)
   
   

    
    
    

    try {

      // route using  offer_id 
  

  
     if ( offer10 === true) {

   await networkService.acceptOffer10(reqdata,res)
     } else {

await networkService.acceptOffer05(reqdata,res)

  
   
     }
 
      
  
  
    }  catch(err){
  

console.log(err.message)
      
      res.status(400).json({
       
        message : "somthing goes wrong"

      })
       
      
  
    }
  
    
     
  
  
  
  }//Class