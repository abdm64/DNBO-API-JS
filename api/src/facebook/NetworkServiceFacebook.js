

//@ts-check
const axiosOne = require('axios')
const OfferData = require('../UploadsManager/offerData');
const offerData = new OfferData()

const https = require('https');

const axios = axiosOne.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });
var errer;


'use strict';


class NetworkSrviceFacebook {



    async getDbss(reqdata){
        const DBSS_API_SUBS = process.env.DBSS_API_SUBS
        let msisdn = reqdata.msisdn
        let res = await axios.get(DBSS_API_SUBS+msisdn)
        let id = parseInt(res.data.data[0].id)
        let paymentType = res.data.data[0].attributes["payment-type"] 
    
    
      }



}//class


module.exports = NetworkSrviceFacebook;