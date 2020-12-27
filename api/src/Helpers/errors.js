const  dnboErr = (data) =>{


    return {
        source: 'DNBO 1.0',
        statusCode : 400,
        Message : data.errMessage,
        errCode : data.errCode
    }
}

const dbssIdErr =  {
    source: 'DBSS',
    statusCode : 400,
    Message : "Error performing the API call: Data empty! Subscriber ID can not be identified"
} 

const dbssBalanceErr  = {
    source: 'DBSS',
    statusCode : 400,
    Message : "There was a problem getting the balance"
}
const simCardTypeErr =  {
    source: "DNBO 1.0",
    statusCode: 400,
    Message: "Profile not elgible",
    errCode: 300
  }

const  noOffers = {
    source : "dte-dnbo",
    statusCode : 400,
    Message: "No Offers available for you",
    errCode: 120


}







module.exports ={

 dnboErr,dbssIdErr, dbssBalanceErr,simCardTypeErr, noOffers

    
  }
  