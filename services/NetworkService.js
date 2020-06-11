
const axios = require('axios')
const OfferData = require('../data/offerData');
const offerData = new OfferData()


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

//console.log(err)



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





}
return data


}


  async acceptOffer05(reqData) {

    const apiUrl = process.env.ACCEPT05

    const auth =  {
      username: process.env.USER,
      password: process.env.PASS
    }
      
     // var data;

try {

 await axios.post(apiUrl, reqData,{ auth : auth})



} catch(err){


//console.log(err)


}


}
 async acceptOffer10(reqData){
   console.log("accept offer 10");
   
    const apiUrl = process.env.ACCEPT01


    var data;

    
   return data = await axios.post(apiUrl, reqData)
   


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