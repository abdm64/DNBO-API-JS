
const axios = require('axios')


'use strict';
class NetworkService {

//DNBO 05
async getOffers05(reqdata){

    //  reqData if ( channel_id : -1 ) request data from redouane

    const postOffersUrl = "http://172.16.64.42:15558/Evolving/Api/Evolution/PresentOffers"
    const auth =  {
        username: "Djezzy_dnbo_user",
        password: "orascom2014++"
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


    const postOffersUrl = "http://172.16.64.98:6061/dnbo-engine/PresentOffers"
    
      var data;

try {
 data = await axios.post(postOffersUrl, sentData)


} catch(err){

//console.log(err)



}
return data


}


  async acceptOffer05(reqData) {

    const apiUrl = "http://172.16.64.42:15558/Evolving/Api/Evolution/Acceptoffer"

    const auth =  {
        username: "Djezzy_dnbo_user",
        password: "orascom2014++"
      }
      
      var data;

try {
 data = await axios.post(apiUrl, reqData,{ auth : auth})



} catch(err){

//console.log(err)



}
return data

}
 async acceptOffer10(reqData){
    const apiUrl = "http://172.16.64.98:6061/dnbo-engine/AcceptOffer"


    var data;

    try {
     data = await axios.post(apiUrl, reqData)
    
    
    
    } catch(err){
    
    //console.log(err)
    
    
    
    }
    return data



}








}


module.exports = NetworkService;