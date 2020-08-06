



const fs = require('fs');
const offersArray = JSON.parse(fs.readFileSync("../uploads/offer_code_price.json", 'utf8'));

const channelArray = JSON.parse(fs.readFileSync('../uploads/dnbo_channel_id.json', 'utf8'));

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

