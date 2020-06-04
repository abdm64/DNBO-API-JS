const OfferData = require('../data/offerData');
const offerData = new OfferData()






class DataService {


mergeOffers(offers05,offers10){
    let dataArray = [ offers05,offers10];
    let dataMerged = [].concat(...dataArray)
   // console.log(dataMerged)

 
  



return dataMerged

}

labeleOffers05(datas){
  
if (datas === undefined) {

    return
} 


    for (let  data of datas){
              delete data.offer_category_name
              delete data.action_type_name
              data.routeName = "static"
              data.Offer_code = offerData.getoffersById(data.offer_id).offer_code
              data.price = offerData.getoffersById(data.offer_id).price

    }


 return datas
}



labeleOffers10(datas){
    
  
    if (datas === undefined) {
    
        return
    } 
    
        for (let  data of datas){
            delete data.action_type_name
            delete data.offer_type_name
            data.routeName = "dynamic"
            // TODO ADD offer_Code to the output
            // data.Offer_code = offerData.getoffersById(data.offer_id)[0].offer_code
          //  data.price = offerData.getoffersById(data.offer_id)[0].price
    
        }
    
    
     return datas
    }
    








}


module.exports = DataService;