const OfferData = require('../data/offerData');
const offerData = new OfferData()






class DataService {


mergeOffers(offers05,offers10){
   
   

    let dataMerged = { 

        static : offers05,
        dynamic : offers10
    }


 
  



return dataMerged

}

labeleOffers05(datas){
  
if (datas === undefined) {

    return
} 


    for (let  data of datas){
             const offerID = data.offer_id
              delete data.offer_category_name
              delete data.action_type_name
              delete data.offer_type_name
            //  data.routeName = "static"
              data.offer_id = parseFloat(offerID) + 0.5
              data.Offer_code = offerData.getoffersById(offerID).offer_code
              data.offer_name = data.offer_name
              data.price = offerData.getoffersById(offerID).price
              data.position = data.position

    }

   


 return datas
}



labeleOffers10(datas){
    
  
    if (datas === undefined) {
    
        return
    } 
    
        for (let  data of datas){
            const offerID = data.offer_id
            delete data.action_type_name
            delete data.offer_type_name
            delete data.score
            delete data.offer_short_description
             data.offer_id = parseFloat(offerID) + 0.1
             data.offer_code = data.offer_code
             data.offer_name = data.offer_name
            //data.offer_short_description = data.offer_short_description
             data.price = parseFloat(data.price)
             data.position = parseFloat(data.position)
          
        }

        
    
    
    
     return datas
    }

     switchData(dataOffers05,dataOffers10,res){




       
      if ( dataOffers05.data === undefined) {
          
        const data10 = this.labeleOffers10(dataOffers10.data)
        res.status(200).json({
            dynamic: data10,
            static: "errMessge"
            
        })

      } else if ( dataOffers10.data === undefined) {
       
        const data05 = this.labeleOffers05(dataOffers05.data)
        res.status(200).json({
            static: data05,
            dynamic : dataOffers10
        })

      }else if  (dataOffers10.data === undefined && dataOffers05.data === undefined ) {

        res.status(400).json({
            message: "no offer for you "
          })
           
        

      } else{

           const data05 = this.labeleOffers05(dataOffers05.data)
           const data10 = this.labeleOffers10(dataOffers10.data)
           const dataMerged = this.mergeOffers(data05,data10)
           res.status(200).send(dataMerged)
      }
    }

    checkOffer10(offer_id){
        
        const offer = parseInt(offer_id.toString().split(".")[1])
       

            
        return offer === 1
            
    }
    








}//Class 


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