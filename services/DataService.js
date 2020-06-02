const OfferData = require('../data/offerData');
const offerData = new OfferData()






class DataService {


mergeOffers(offers05,offers10){
    let dataArray = [ offers05,offers10];
    let dataMerged = [].concat(...dataArray)
   // console.log(dataMerged)

 
  



return dataMerged

}

labeleOffers(datas,status){
  
if (datas === undefined) {

    return
} 


    for (let  data of datas){

        data.routeName = status
        console.log(offerData.getoffersById(data.offer_id))
            //   data.Offer_code = offerData.getoffersById(data.offer_id)[0].offer_code
            //   data.price = offerData.getoffersById(data.offer_id)[0].price

    }


 return datas
}



labeleOffers10(datas,status){
  
    if (datas === undefined) {
    
        return
    } 
    
        for (let  data of datas){
    
            data.routeName = status
            // data.Offer_code = offerData.getoffersById(data.offer_id)[0].offer_code
          //  data.price = offerData.getoffersById(data.offer_id)[0].price
    
        }
    
    
     return datas
    }
    








}


module.exports = DataService;