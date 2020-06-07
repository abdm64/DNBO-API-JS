
const axios = require('axios')


'use strict';
class NetworkService {

//DNBO 05
async getOffers05(reqdata){

    //  reqData if ( channel_id : -1 ) request data from redouane

    const postOffersUrl = process.env.OFFERS05
    const auth =  {
        username: process.env.USER,
        password: process.env.PASS
      }
      
      var data;

try {
 data = await axios.post(postOffersUrl, reqdata,{ auth : auth})



} catch(err){

//console.log(err)



}


return data

}
//DNBO 1.0
async getoffers01(reqdata){

    const sentData = {

        msisdn : reqdata.msisdn,
        channel_id : reqdata.channel_id,
        sales_channel_id : reqdata.channel_id
    }


    const postOffersUrl = process.env.OFFERS01
    
      var data;

try {
 data = await axios.post(postOffersUrl, sentData)


} catch(err){

//console.log(err)



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

    // try {
    
    
    
    //  return data

    // } catch(err){
    
    // console.log(err.message)
    // return 
  
    // }
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