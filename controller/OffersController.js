

const Networks = require('../services/NetworkService')
const DataService = require('../services/DataService')
const networkService = new Networks()
const dataService = new DataService()


exports.presentOffers = async (req,res) =>{

    const reqdata = req.body
    //{"msisdn":783605591,"channel_id":-1}

    // only one response 
    try {


      const dataOffers05 =  await networkService.getOffers05(reqdata)
      const dataOffers10  = await networkService.getoffers01(reqdata)
      if ( dataOffers05 === undefined) {
          
        const data10 = dataService.labeleOffers10(dataOffers10.data)
        res.status(200).send(data10)

      } else if ( dataOffers10 === undefined) {
       
        const data05 = dataService.labeleOffers05(dataOffers05.data)
        res.status(200).send(data05)

      }else if  (dataOffers10 === undefined && dataOffers05 === undefined ) {

     
        

      } else{

           const data05 = dataService.labeleOffers05(dataOffers05.data)
           const data10 = dataService.labeleOffers(dataOffers10.data)
           const dataMerged = dataService.mergeOffers(data05,data10)
           res.status(200).send(dataMerged)
      }
      



   
  

    }  catch(err){
      console.log(err)

      res.status(200).json({
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