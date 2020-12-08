let dbss = require('./DbssNetworkService')
let networkService = require('../services/NetworkService')
let dataService = require('../services/DataService')
const offer_id_types = require('../uploads/offer_id_type.json')



const  sendOffer = async (reqData) => {
    
    let response
    try{
      
        let dbssInfo = await dbss.getDSubsInfo(reqData)

        if (dbssInfo.err){


            return {
                status : 400,
                Response : {
                    source: 'DBSS',
                    statusCode : 400,
                    Message : "Error performing the API call: Data empty! Subscriber ID can not be identified"
                }


            }
        } 
       
      
        let pripaid = dbssInfo.pripaid
       
        

   
        if (pripaid){
           
           
              const amount = dbssInfo.amount
              
             // ( amount < 30 && offer_id = 138 ){
              
              // }
// 
             
              const data = await networkService.getoffers01(reqData)
            if ( data.data === undefined){
                return  {
                        status:400,
                        Response : {
                            source: 'DNBO 1.0',
                            statusCode : 400,
                            Message : data.errMessage,
                            errCode : data.errCode
                        }

                }


            }
    
             
             
              const offer10 = dataService.labeleOffers10(data.data)

              if ( amount < 30) {
                //    send that offer with offer id  default offer
                //{ "offer_id": 1521, "offer_code": "DOVINTSPEEDDAY1GoPRE", "offer_name": "UAT Internet Jour 1 Go", "price": 100, "position": 1}

                return  {
                    status : 200,
                    Response : { "offer_id": 1521, "offer_code": "DOVINTSPEEDDAY1GoPRE", "offer_name": "UAT Internet Jour 1 Go", "price": 100, "position": 1}
                  }



              }
              const offerFilterd =  filterOffer( offer10,amount)

              response = {
                status : 200,
                Response : offerFilterd
              }
              

               
               


               
   
        } else {
            // send static offer Post Paid
            //TODO POST 








        }




    } catch(err){
        //TODO send err message with status 



        console.log(err)

return {

    status : 500,
    Response : "Internal server Error"
}
    }

    



    return  response
}


const filterOffer = ( offer10,amount) => {

 

    let allData = []
    
  const atl = getOfferType(offer10).atl
  const btl = getOfferType(offer10).btl

 
  
  let validAtlArr = validOffers(atl,amount)
  let validAtl = validAtlArr[validAtlArr.length - 1]
  
   let validBtlArr = validOffers(btl, amount)
   let validBtl = validBtlArr[validBtlArr.length - 1]




   if(validAtl.price  === validBtl.price){

    validBtl = validBtlArr[validBtlArr.length - 2]
    if ( validBtl === undefined ){
        validBtl = { "offer_id": 1171, "offer_code": "YOUTUBEUNLIMITED", "offer_name": "UAT 600DA=illimité Youtube/30Jours", "price": 600, "position": 2}
    } 



    




   }

    validAtl.position = 1
    validBtl.position = 2
   allData.push(validAtl)
   allData.push(validBtl)


   
   
   
   
    return allData
}
//

const getOfferType = (offers) => {
    let atl  = []
    let btl  = []
    let offersIds = []




    for (let offer of offers ) {
       

            for (let offer_id_type of offer_id_types ) {
               
                if ( offer.offer_id === offer_id_type.offer_id) {
               
                    offersIds.push(offer.offer_id) 
                  
                    if (offer_id_type.offer_type === 0){
                     
                     
                        atl.push(offer)
                    } else if (offer_id_type.offer_type === 1) {
                      
                      
                        btl.push(offer)
                    


                    }

                }



            }
          

    }

  

  let data = {

    atl : atl ,
    btl : btl 
}

   

    return  data


}
const validOffers = (offersArray,amount) =>{
    
    
    
 let offerAmount = offersArray.filter((offer)=>{
        let price =  parseInt(offer.price)
    

        return   price <= amount
    })
    

    .sort((a,b) => {


  return a.price - b.price
    })
  

    return offerAmount


}



module.exports = { sendOffer }

