


exports.checkValue = (reqBody) =>{
    if ( ( reqBody.msisdn === undefined ) || reqBody.channel_id === undefined ){
    
    console.log(reqBody)
        return false
    } else {
    
        return true
    }
    
    
    }