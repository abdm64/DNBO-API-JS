let dbss = require('./DbssNetworkService')
let networkService = require('../services/NetworkService')
let dataService = require('../services/DataService')
const offer_id_types = require('../uploads/offer_id_type.json')



const  sendOffer = async (reqData) => {
    
    let response
    try{
      
        let dbssInfo = await dbss.getDSubsInfo(reqData)
       
      
        let pripaid = dbssInfo.pripaid
       
        

   
        if (pripaid){
           
           
              const amount = dbssInfo.amount
             // ( amount < 30 && offer_id = 138 ){
               //    send that offer with offer id  default offer
              // }
// 
             
              const data = await networkService.getoffers01(reqData)
             
             
              const offer10 = dataService.labeleOffers10(data.data)
              const offerFilterd =  filterOffer( offer10,amount)

              response = {
                status : 200,
                offers : offerFilterd
              }
              

                //get offer_id with filtrea array
               


               
   
        } else {
            // send static offer 
            //TODO




        }




    } catch(err){
        //TODO send err message with status 

        console.log(err)

return err.message
    }

    



    return  response
}


const filterOffer = ( offer10,amount) => {

 

    let allData = []
    
  const atl = getOfferType( offer10).atl
  const btl = getOfferType(offer10).btl

 
  
   const validAtl = validOffers(atl,amount)
  
   const validBtl = validOffers(btl, amount)
  
   allData.push(validAtl)
   allData.push(validBtl)

   
   
   
   
    return allData
}
//

const getOfferType = (offers) => {
    let atl  = []
    let btl  = []



    for (let offer of offers ) {
       

            for (let offer_id_type of offer_id_types ) {
               
                if ( offer.offer_id === offer_id_type.offer_id) {
               
                  
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
  

    return offerAmount[offerAmount.length - 1]


}



module.exports = { sendOffer }

