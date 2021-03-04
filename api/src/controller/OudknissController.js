const dbss = require('../services/DbssNetworkService')
const networkService = require('../services/NetworkService')
const dataService = require('../services/DataService')
const offersHelper = require('../Helpers/offersHelper')
const staticOffers = require('../Helpers/staticOffers')
const errors = require('../Helpers/errors')






const  presentOffers = async (reqData) => {


    
    let response
    try{
      
        let dbssInfo = await dbss.getDSubsInfo(reqData)
       
        

        if (dbssInfo.err){
            return {
                status : 400,
                Response : dbssInfo.message
            }
        } 
        
    
   
      
        let pripaid = dbssInfo.pripaid
        let postpaid = dbssInfo.postpaid
        let hybrid = dbssInfo.hybrid
        let simData = dbssInfo.simData
        
        
        if(simData){
            
            response = {
                specialSim : true,
                status: 200,
                Response: staticOffers.simDataOffers
            }



        }


   
        if (pripaid ){ 
              const amount = dbssInfo.amount 
              const resOffer10 = await networkService.getoffers01(reqData)
              const resOffer05 = await networkService.getOffers05(reqData)
             // console.log(resOffer05.data)
             

              

            if ( resOffer10.data === undefined || resOffer05.data === undefined){
                const res = resOffer10 || resOffer05
                return  {
                        status:400,
                        Response : errors.dnboErr(res)
                }


            }
    
             
             
              const offer10 = dataService.labeleOffers10(resOffer10.data)
              const offer05 = dataService.labeleOffers05(resOffer05.data)
              
              
              if ( amount < 30) {
                let tranquiloOffer = staticOffers.tranquiloOffer(offer10)

                    if(tranquiloOffer.length !== 0){
                             return  {
                                 status : 200,
                                 Response : staticOffers.tranquiloOffer(offer10)
                                 }

                    } else {

                         return  {
                                 status : 409,
                                 Response : errors.noOffers
                                 }



                    }
               



              }
              //more tha 30
            
              const offerFilterdAtl = offersHelper.filterOfferByAmount(offer10,amount)
           
              const atl = offerFilterdAtl[0]
           
            
              
               response = {
                status : 200,
                Response : {atl : atl, btl: offer05 }
              }
              

               
               


               
   
        } 

        if(postpaid){
            // send static offer Post Paid
            //TODO POST 
// get from 10

// 0- ATL prep/hybrid 1- BTL prep/hybrid 2- ATL Postpaid 3- BTL Postpaid 4- Tranquilo Prep/hybrid

            response = {
                specialSim : true,
                status : 200,
                Response : staticOffers.postpaidOffers
              }
              





        } 
        
        if (hybrid){

            response = {
                specialSim : true,
                status : 200,
                Response : staticOffers.hybridOffers
              }
              


        }
       



    } catch(err){
        //TODO send err message with status 



        console.log(err)

return {

    status : 500,
    Response : {
        title : "Internal server Error",
        message : "can't get result from DNBO 1.0",
        source : 'DNBO'
        
    } 
}
    }

    



    return  response
}

module.exports = { presentOffers }




// 60 15 14 70  19 80 30 50 16 18