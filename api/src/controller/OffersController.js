//@ts-check

const networkService = require('../services/NetworkService')
const dataService = require('../services/DataService')
const facebookeflexController = require("./FacebookflexController")
const logController = require('./LogController')
const checkHelper = require('../Helpers/checker')




exports.presentOffers = async (req,res,next) =>{

  if (!checkHelper.checkValue(req.body)){


		return res.status(400).send({message : "Bad Request msisdn and channel_id must be defined"})
  }
 

  
let msisdn = (req.body.msisdn).toString().substring(3)



const channel_id = parseInt(req.body.channel_id) 
    const reqdata = {
      msisdn : parseInt(msisdn),
      channel_id : parseInt(req.body.channel_id) ,
      language : req.body.language || "FR"
    }
   
 
    const reqPrams =  req.query
    
 
if ( channel_id === 18  || channel_id === 19   ) {
  



   facebookeflexController.presentOffers(reqdata).then((response)=>{
 
    
     

    const status = response.status
    const offers = response.Response
    let time = new Date()

let logs = {
  status:status,
  timestemp : time.toISOString(),
  msisdn:  parseInt('213'+msisdn),
  channel_id: channel_id,
  Response : offers

}
  
    logController.log(logs)
  
    res.status(status).send(offers)

  //  logController.log(log)

   }).catch((err) => {

console.log(err)


   })


  
 
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
     
      dataService.switchData(sendData)
    
     


    }  catch(err){
      console.log(err)

      res.status(500).json({
        message: "Internal server Err"
      })
       
      

    }
  }
}

exports.acceptOffer = async (req,res)=>{
  if (!checkHelper.checkValue(req.body)){


		return res.status(400).send({message : "Bad Request msisdn and channel_id must be not undefined"})
	}

  let msisdn = (req.body.msisdn).toString().substring(3)

    const reqdata = {
      msisdn : parseInt(msisdn),
      channel_id:req.body.channel_id,
      offer_id: req.body.offer_id
    }
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