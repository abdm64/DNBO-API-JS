//@ts-check
const axiosOne = require('axios')
const offerData  = require('../DataManager/offerData');
const time = process.env.TIME || 3000


const https = require('https');

const axios = axiosOne.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });
var errer;


'use strict';



  

//DNBO 05
 const getOffers05 = async (reqdata)=>{

  
    const sentData = {
        msisdn : reqdata.msisdn,
        channel_id : offerData.getChannel(reqdata.channel_id).channel05 || 0,
        language : reqdata.language
    }
    //console.log(sentData);

   

    const postOffersUrl = process.env.OFFERS05
    const auth =  {
        username: process.env.USER,
        password: process.env.PASS
      }
      const timeout  = { timeout: time}

      
      var data;

try {
 data = await axios.post(postOffersUrl, sentData,{ auth : auth},timeout)



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
const getoffers01 = async (reqdata) =>{
 

    
    const sentData = {
      msisdn : reqdata.msisdn,
      channel_id : offerData.getChannel(reqdata.channel_id).channel10 || 0,
      sales_channel_id : offerData.getChannel(reqdata.channel_id).channel10 || 0,
      language: getLanguage(reqdata.language)    
    
    }
    

  //console.log(sentData);


    const postOffersUrl = process.env.OFFERS01
    
      var response;
   
      const timeout  = { timeout: time}
      

try {
 response = await axios.post(postOffersUrl, sentData,timeout)
 


} catch(err){
const error = err.response.data

const errorResponse = {
  errMessage :error.ErrorMessage, 
  errCode :error.ErrorCode 
}



return errorResponse

}
return response


}


  const acceptOffer05 = async (reqData,res) => {
    const offerId = parseFloat(offerData.stringFy10(reqData.offer_id))

    const sentData = {
      msisdn : parseInt(reqData.msisdn),
      offer_id : offerId,    
      channel_id : offerData.getChannel(parseInt(reqData.channel_id)).channel05
      
    }
    


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
    message: err.response.data
  })
   
//console.log(err)


}


}


const  acceptOffer10 = async (reqdata,res) => {
  
  

  const sentData = {

   
    msisdn : parseInt(reqdata.msisdn),
    channel_id : offerData.getChannel(parseInt(reqdata.channel_id)).channel10 || 0,
    sales_channel_id : offerData.getChannel(reqdata.channel_id).channel10 || 0,
    offer_id : offerData.stringFy10(reqdata.offer_id)
 
   }

 
   
    const apiUrl = process.env.ACCEPT01




    try {

      await axios.post(apiUrl, sentData)
      res.status(200).send()
    } catch(e) {
      //console.log(e)

      res.status(400).json({
        message: e.response.data
      })
       
    
    }
    
   


}

const getLanguage =(lang) => {
    

  if (lang === "AR"){

      return "ar-dz"
  }else {

    return lang
  }





}







module.exports ={



  getOffers05,
  getoffers01, 
  acceptOffer10, 

  acceptOffer05
}





