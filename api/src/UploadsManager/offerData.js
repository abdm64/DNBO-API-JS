


const offersArray  = require('../uploads/offer_code_price.json')

const channelArray = require('../uploads/dnbo_channel_id.json');

class OfferData {


    getoffersById(id){

        
        return  offersArray.filter( offer => offer.offer_id === id )[0] || 0 
    }

    getChannel(id){
       // console.log(channelArray)
        return channelArray.filter( channel =>  channel.channel_id === id  )[0] || 0 
    }

    stringFy10(offer_id){
            const offerString = offer_id.toString()
           let  str = offerString.slice(0, -1); 

            return str
    }









}
module.exports = OfferData;

