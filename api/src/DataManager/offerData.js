
//@ts-check

const offersArray  = require('../files/offer_code_price.json')

const channelArray = require('../files/dnbo_channel_id.json');




 const   getoffersById = (id)=>{

        
        return  offersArray.filter( offer => offer.offer_id === id )[0] || 0 
    }

   const  getChannel = (id ) =>{
        
        return channelArray.filter( channel =>  channel.channel_id === id  )[0] || 0 
    }

   const stringFy10 = (offer_id)=>{
            const offerString = offer_id.toString()
           let  str = offerString.slice(0, -1); 

            return str
    }










module.exports = {
    getoffersById,
    getChannel,
    stringFy10,

}

