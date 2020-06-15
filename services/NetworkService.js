
const axios = require('axios')
const OfferData = require('../data/offerData');
const offerData = new OfferData()
var errer;


'use strict';
class NetworkService {

//DNBO 05
async getOffers05(reqdata){

  
    const sentData = {
        msisdn : reqdata.msisdn,
        channel_id : offerData.getChannel(reqdata.channel_id).channel05 || 0
    }

   

    const postOffersUrl = process.env.OFFERS05
    const auth =  {
        username: process.env.USER,
        password: process.env.PASS
      }
      
      var data;

try {
 data = await axios.post(postOffersUrl, sentData,{ auth : auth})



} catch(err){

  const error = err.response.data
  const errorResponse = {
    errMessage :error.ErrorMessage, 
    errCode :error.ErrorCode 
  }
  
  
  //store err 
  return errorResponse



}


return data

}
//DNBO 1.0
async getoffers01(reqdata){

    
    const sentData = {
      msisdn : reqdata.msisdn,
      channel_id : offerData.getChannel(reqdata.channel_id).channel10 || 0,
      sales_channel_id : offerData.getChannel(reqdata.channel_id).channel10 || 0
    
    }

  


    const postOffersUrl = process.env.OFFERS01
    
      var data;

try {
 data = await axios.post(postOffersUrl, sentData)


} catch(err){
const error = err.response.data

const errorResponse = {
  errMessage :error.ErrorMessage, 
  errCode :error.ErrorCode 
}



return errorResponse

}
return data


}


  async acceptOffer05(reqData,res) {
    const offerId = parseFloat(reqData.offer_id)

    const sentData = {
      msisdn : reqData.msisdn,
      offer_code : reqData.Offer_code,
      offer_id : offerId - 0.5,
      position : reqData.position,
      channel_id : offerData.getChannel(reqData.channel_id).channel05
    }
    //console.log(sentData)

    const apiUrl = process.env.ACCEPT05

    const auth =  {
      username: process.env.USER,
      password: process.env.PASS
    }
      
     // var data;

try {

 await axios.post(apiUrl, sentData,{ auth : auth})

 res.status(200).send()

} catch(err){

  res.status(400).json({
    message: err
  })
   
//console.log(err)


}


}
 async acceptOffer10(reqData,res){
  const offerId = parseFloat(reqData.offer_id)

  const sentData = {
    msisdn : reqData.msisdn,
    offer_code : reqData.offer_code,
    offer_id : offerId - 0.1,
    position : reqData.position,
    channel_id : offerData.getChannel(reqData.channel_id).channel10
  }
  //console.log(sentData)
   
    const apiUrl = process.env.ACCEPT01


   

    try {

      await axios.post(apiUrl, sentData)
      res.status(200).send()
    } catch(e) {

      res.status(400).json({
        message: e
      })
       
    //  console.log(e)
    }
    
   


}








}


module.exports = NetworkService;


//  {
// 	 	"msisdn":783605591,"channel_id": 3,
//     "offer_id": 10261,
//     "offer_name": "40= 60 Min Djezzy + 50 DA TOUS /24",
//     "position": 2,
//     "routeName": "static",
//     "Offer_code": "BTLONNET60MINCROSSNET50DADAY",
//     "price": 40
//  }