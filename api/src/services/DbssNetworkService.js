

//@ts-check
const axiosOne = require('axios')
const errors = require('../Helpers/errors')
const https = require('https')
const axios = axiosOne.create({
    httpsAgent: new https.Agent({  
      rejectUnauthorized: false
    })
  });



'use strict';




  

   const  getDSubsInfo = async (reqdata) =>{
    
        let dbssInfo = {};
        const DBSS_API_SUBS = process.env.DBSS_API+'/api/v1/subscriptions/?filter%5Bmsisdn%5D='
        const filter = "filter%5Bstatus%5D=active&filter%5Bstatus%5D=dormant"
        const url =  `${DBSS_API_SUBS}213${reqdata.msisdn}&${filter}`
        let res = await axios.get(url)
        const dataChecker = res.data.data.length
        
    
    if (  dataChecker === 0){


      return {
          err : true,
          message : errors.dbssIdErr
      }
    }





        let id = parseInt(res.data.data[0].id)
       
        let paymentType = res.data.data[0].attributes["payment-type"] 
         const  emplyerCard =    await getSimCardType(id)
        
         

         if (emplyerCard){
        

          return {

            err : true,
            message : errors.simCardTypeErr
            

          }
          


         }
        
  
        if (paymentType === 'prepaid' ||  paymentType === 'hybrid'){
         
          let amount = await getAmount(id)
       

          if( amount.err){
            

            return {

              err : true,
              message : errors.dbssBalanceErr

            }
          }

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
     
        let dbssblaceurl = buildUrl(id).balanceApi
        let res = await axios.get(dbssblaceurl) 
        
       

        
       if ( res.data.data[0] === undefined ){


        return {
                err: true,
                message : errors.dbssBalanceErr
         
              }
          }


        let  amount = parseInt(res.data.data[0].attributes.amount)

        
        
        

        return amount

      }
   const  getSimCardType = async (id) => {
    let dbssSimCardTypeUrl= buildUrl(id).simCardType
    let res = await axios.get(dbssSimCardTypeUrl) 

    
   

    return res.data.data.attributes.code === 'EmployesPost'

      }


  const buildUrl = (id) =>{
        return  {
          
        balanceApi :  process.env.DBSS_API + `/api/v1/subscriptions/${id}/balances` ,
        simCardType : process.env.DBSS_API + `/api/v1/subscriptions/${id}/subscription-type`
        
        
        }
      }






module.exports = { getDSubsInfo }