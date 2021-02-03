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
       
        

   
        if (pripaid ){ 
              const amount = dbssInfo.amount 
              const res = await networkService.getoffers01(reqData)
              

            if ( res.data === undefined){
                return  {
                        status:400,
                        Response : errors.dnboErr(res)
                }


            }
    
             
             
              const offer10 = dataService.labeleOffers10(res.data)
              if ( amount < 30) {
                let tranquiloOffer = staticOffers.tranquiloOffer(offer10)

                    if(tranquiloOffer.length !== 0){
                             return  {
                                 status : 200,
                                 Response : staticOffers.tranquiloOffer(offer10)
                                 }

                    } else {

                         return  {
                                 status : 400,
                                 Response : errors.noOffers
                                 }



                    }
               



              }
              //more tha 30
            
              const offerFilterd = offersHelper.filterOfferByAmount(offer10,amount)
              
               response = {
                status : 200,
                Response : offerFilterd
              }
              

               
               


               
   
        } 

        if(postpaid){
            // send static offer Post Paid
            //TODO POST 
// get from 10

// 0- ATL prep/hybrid 1- BTL prep/hybrid 2- ATL Postpaid 3- BTL Postpaid 4- Tranquilo Prep/hybrid

            response = {
                status : 200,
                Response : staticOffers.postpaidOffers
              }
              





        } 
        
        if (hybrid){

            response = {
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

