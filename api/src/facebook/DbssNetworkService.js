

//@ts-check
const axiosOne = require('axios')
const https = require('https')
const axios = axiosOne.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });



'use strict';




  

   const  getDSubsInfo = async (reqdata) =>{
    
      let dbssInfo = {};
        const DBSS_API_SUBS = process.env.DBSS_API_SUBS
        let msisdn = '213'+reqdata.msisdn
        const url = DBSS_API_SUBS+msisdn
        let res = await axios.get(url)
      
        const dataLength = res.data.data.length
       
    if ( dataLength === 0){


      return {
          err : true
      }
    }





        let id = parseInt(res.data.data[0].id)
        let paymentType = res.data.data[0].attributes["payment-type"] 
  
        if (paymentType === 'prepaid' ||  paymentType === 'hybrid'){
         
          let amount = await getAmount(id)

          dbssInfo = {
              pripaid : true,
              amount : amount
          }



        } else {

          dbssInfo = {

            pripaid : false,
            amount : 0
          }


        }



        
    return dbssInfo
    
      }

    const getAmount = async (id) =>{
        let dbssblaceurl = buildUrl(id)
        let res = await axios.get(dbssblaceurl)
        let  amount = parseInt(res.data.data[0].attributes.amount)
        //ERR Handling 

        return amount

      }


  const buildUrl = (id) =>{
        return  process.env.DBSS_API_BALANCE + `/api/v1/subscriptions/${id}/balances`
      }






module.exports = { getDSubsInfo }