

const Networks = require('../services/NetworkService')
const DataService = require('../services/DataService')
const networkService = new Networks()
const dataService = new DataService()


exports.presentOffers = async (req,res) =>{
  console.log("fromjmeter")

    const reqdata = req.body
    const position = reqdata.postion
    const reqPrams =  req.query
    
   console.log(reqdata);

  
    

    
    try {

      const dataOffers05 =  await networkService.getOffers05(reqdata)
      const dataOffers10  = await networkService.getoffers01(reqdata)
      dataService.switchData(dataOffers05,dataOffers10,res,reqPrams)


    }  catch(err){
      console.log(err)

      res.status(400).json({
        message: "Task failed successfully "
      })
       
      

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