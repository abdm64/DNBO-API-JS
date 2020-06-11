

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
    var data;
    

    try {

      // route using  offer_id 
  
     if ( reqdata.routeName === "static") {
  
  
     await networkService.acceptOffer05(reqdata)
     res.sendStatus(200)
   


  
     } else if  ( reqdata.routeName === "dynamic") {
  
  
   await networkService.acceptOffer10(reqdata)
  res.sendStatus(200)
   
     }
     console.log(data)
      
  
  
    }  catch(err){
  

console.log(err.message)
      
      res.status(500).json({
       
        message : "somthing goes wrong"

      })
       
      
  
    }
  
    
     
  
  
  
  }