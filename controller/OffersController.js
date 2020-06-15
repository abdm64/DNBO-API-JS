

const Networks = require('../services/NetworkService')
const DataService = require('../services/DataService')
const networkService = new Networks()
const dataService = new DataService()


exports.presentOffers = async (req,res) =>{

    const reqdata = req.body
    

    // only one response 
    try {

      const dataOffers05 =  await networkService.getOffers05(reqdata)
      const dataOffers10  = await networkService.getoffers01(reqdata)
      dataService.switchData(dataOffers05,dataOffers10,res)


    }  catch(err){
      console.log(err)

      res.status(400).json({
        message: "no offer for you "
      })
       
      

    }
}

exports.acceptOffer = async (req,res)=>{

    const reqdata = req.body
    const offer10 = dataService.checkOffer10(reqdata.offer_id)
    var data;

    
    
    

    try {

      // route using  offer_id 
  
     if ( offer10 === true) {


     const datastr = {

      offer_code : reqdata.offer_code,
      offer_name : reqdata.offer_name,
      position : reqdata.position.toString(),
      price : reqdata.price.toString(),
      msisdn : reqdata.msisdn,
      channel_id : reqdata.channel_id,
      offer_id : reqdata.offer_id.toString()
    
     
   

     }
       

   await networkService.acceptOffer10(datastr,res)
  
    
   


  
     } else {

     // console.log("offer05");
await networkService.acceptOffer05(reqdata,res)

  
   
     }
 
      
  
  
    }  catch(err){
  

console.log(err.message)
      
      res.status(400).json({
       
        message : "somthing goes wrong"

      })
       
      
  
    }
  
    
     
  
  
  
  }//Class