const OfferData = require('../data/offerData');
const offerData = new OfferData()






class DataService {


mergeOffers(offers05,offers10){

    let dataMerged = { ...offers05, ...offers10}


 
  



return dataMerged

}

labeleOffers05(datas){
  
if (datas === undefined) {

    return
} 


    for (let  data of datas){
        
              delete data.offer_category_name
              delete data.action_type_name
              delete data.offer_type_name
            //  data.routeName = "static"
              data.Offer_code = offerData.getoffersById(data.offer_id).offer_code
              data.price = offerData.getoffersById(data.offer_id).price

    }

    const dnboData = {

        routeName : "static",
        data : datas
    }


 return dnboData
}



labeleOffers10(datas){
    
  
    if (datas === undefined) {
    
        return
    } 
    
        for (let  data of datas){
          
          data.offer_code = data.offer_code
          data.offer_name = data.offer_name
          data.offer_short_description = data.offer_short_description
          data.position = parseFloat(data.position)
          data.price = parseFloat(data.price)
          data.score = parseFloat(data.score)  
          data.offer_id = parseFloat(data.offer_id)
        }

        
    const dnboData = {

        routeName : "dynamic",
        data : datas
    }
    
    
     return dnboData
    }
    








}


module.exports = DataService;


// [ {
    //1
//     "offer_id": 10261,

//     "offer_name": "40= 60 Min Djezzy + 50 DA TOUS /24",
//     "position": 2,
//     "routeName": "static",
//     "Offer_code": "BTLONNET60MINCROSSNET50DADAY",
//     "price": 40
//   }]

// [ {
//     "offer_code": "BTLINTSPEEDDAY250Mo",
//     "offer_name": "UAT25Da=250Mo/24H",
//     "offer_short_description": "UAT25Da=250Mo/24H",
//     "position": "1",
//     "price": "25.0",
//     "score": "25",
//     "offer_id": "106",
//     "routeName": "dynamic"
//   } ]