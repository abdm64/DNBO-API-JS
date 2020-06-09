



const fs = require('fs');
const offersArray = JSON.parse(fs.readFileSync('./data/offer_code_price.json', 'utf8'));

const channelArray = JSON.parse(fs.readFileSync('./data/dnbo_channel_id.json', 'utf8'));

class OfferData {


    getoffersById(id){

        
        return  offersArray.filter( offer => offer.offer_id === id )[0]
    }

    getChannel(id){

        return channelArray.filter( channel =>  channel.channel_id === id  )[0]
    }









}
module.exports = OfferData;

