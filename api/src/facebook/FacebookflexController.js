let dbss = require('./NetworkServiceFacebook')
let networkService = require('../services/NetworkService')
let dataService = require('../services/DataService')



const  sendOffer = async (reqData) => {
    try{
        let dbssInfo = await dbss.getDSubsInfo(reqData) // { pripaid : true , amount : 230}
        let pripaid = dbssInfo.pripaid
        let sendOffer
   
        if (pripaid ){
              const amount = dbssInfo.amount
             
              const data = await networkService.getoffers01(reqData)
              const offer10 = dataService.labeleOffers10(data)
                //get offer_id with filtrea array
               // ( amount < 30 && offer_id = 138 ){
               //    send that offer with offer id 
              // }
// 



               sendOffer = filterOffer( offer10,amount)
   
        } else {
            // send static offer 




        }

return sendOffer

    } catch(err){

        let err = { message : err.message}

return err
    }

    




}


const filterOffer = ( offer10,amount) => {
    let allData = []
  const atl = getOfferType( offer10).atl
  const btl = getOfferType(offer10).btl
  const validAtl = validOffers(atl,amount)[validAtl.length - 1]
  const validBtl = validOffers(btl, amount)[validBtl.length - 1]
    allData.push(validAtl)
    allData.push(validBtl)
   

    return allData
}


const getOfferType = (offers10) => {


  
  
  
  
    //  return {ATL = [], BTL = []}



}
const validOffers = (offersArray,amount) =>{


    return  offersArray.filter((offer)=>{
        let price =  parseInt(offer.price)

        return   price <= amount
    })
}



module.exports = { sendOffer }

