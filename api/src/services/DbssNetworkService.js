

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
         const  notAllowedProfile =    await notEligibleProfile(id)
        
        
         

         if (notAllowedProfile){
        

          return {

            err : true,
            message : errors.simCardTypeErr
            

          }
          


         }
        
  
        if (paymentType === 'prepaid' ){
         
          let amount = await getAmount(id)
       

          if( amount.err){
            

            return {

              err : true,
              message : errors.dbssBalanceErr

            }
          }

          dbssInfo = {
              pripaid : true,
              amount : amount,
           
          }



        } else if (paymentType === 'hybrid') {

          let amount = await getAmount(id)

          dbssInfo = {
            hybrid : true,
            amount : amount
        }



        }else {



          dbssInfo = {

            postpaid : true,
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
   const  notEligibleProfile = async (id) => {


     let isCompany = await isCompanyFunc(id)
    const notEligibleProfilesArr = [ 'EmployesPost','SyndicateCtrl','EmployesData','VIP']
    let dbssSimCardTypeUrl= buildUrl(id).simCardType
    let res = await axios.get(dbssSimCardTypeUrl) 
    let simCardType = res.data.data.attributes.code 
    
    
    
    return ( notEligibleProfilesArr.includes(simCardType) || simCardType.toLowerCase().includes('b2b')  || isCompany  )

      }



      const  isCompanyFunc = async (id) => {
        
        let dbssownerCustomer= buildUrl(id).ownerCustomer
        let res = await axios.get(dbssownerCustomer) 
        let isCompany = res.data.data.attributes["is-company"] 
        
      return isCompany
    
          }


  const buildUrl = (id) =>{
    
        return  {
          
        balanceApi :  process.env.DBSS_API + `/api/v1/subscriptions/${id}/balances` ,
        simCardType : process.env.DBSS_API + `/api/v1/subscriptions/${id}/subscription-type`,
        ownerCustomer: process.env.DBSS_API + `/api/v1/subscriptions/${id}/owner-customer`
        
        
        }
      }

    

///













      const acceptOffer =async (acceptdata) =>   {
        const msisdn = acceptdata.msisdn
        const channel_id = acceptdata.channel_id
        const offer_code = acceptdata.offer_code
const data = `<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">
<s:Header>
  <Action s:mustUnderstand="1" xmlns="http://schemas.microsoft.com/ws/2005/05/addressing/none">http://businesslogicsystems.com/RewardManager/IRewardsService/ApplyRewardWithSuccessCheck</Action>
</s:Header>
<s:Body>
  <ApplyRewardWithSuccessCheck xmlns="http://businesslogicsystems.com/RewardManager">
    <commandId>-1000008</commandId>
    <msisdn>${msisdn}</msisdn>
    <amount>0</amount>
    <tariffPlan i:nil="true" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" />
    <externalKey i:nil="true" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" />
    <transactionId i:nil="true" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" />
    <expiryPeriod i:nil="true" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" />
    <source>DNBO</source>
    <campaignId i:nil="true" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" />
    <code>${offer_code}</code>
    <workflowId i:nil="true" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" />
    <isControlGroup>false</isControlGroup>
    <isSimulation>false</isSimulation>
    <userCol01 i:nil="true" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" />
    <userCol02>14</userCol02>
    <userCol03 i:nil="true" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" />
    <userCol04 i:nil="true" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" />
    <userCol05 i:nil="true" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" />
    <userCol06 i:nil="true" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" />
    <userCol07 i:nil="true" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" />
    <userCol08 i:nil="true" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" />
    <userCol09 i:nil="true" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" />
    <userCol10 i:nil="true" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" />
  </ApplyRewardWithSuccessCheck>
</s:Body>
</s:Envelope>`





                                      }





module.exports = { getDSubsInfo, acceptOffer }