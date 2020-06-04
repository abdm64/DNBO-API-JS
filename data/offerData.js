



var fs = require('fs');
var offersArray = JSON.parse(fs.readFileSync('./data/offer_code_price.json', 'utf8'));


class OfferData {


    getoffersById(id){

        
        return  offersArray.filter( offer => offer.offer_id === id )[0]
    }









}
module.exports = OfferData;

