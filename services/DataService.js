const OfferData = require('../UploadsManager/offerData');
const FilterData = require('../UploadsManager/filterData');

const offerData = new OfferData();
const filterData = new FilterData();






class DataService {


mergeOffers(offers05,offers10){
   
   

    let dataMerged = { 

        static : offers05,
        dynamic : offers10
    }


 
  



return dataMerged

}

labeleOffers05(datas){
   


    for (let  data of datas){
        const offerID = data.offer_id
         delete data.offer_category_name
         delete data.action_type_name
         delete data.offer_type_name
         data.offer_id = parseFloat((offerID.toString() + '5')) 
         data.Offer_code = offerData.getoffersById(offerID).offer_code
         data.offer_name = data.offer_name
         data.price = offerData.getoffersById(offerID).price
         data.position = data.position

}

return datas

}



labeleOffers10(datas){
   
    
if ( datas === undefined){

    return
} else {

    for (let  data of datas){

        const offerID = data.offer_id.toString() + '1'
        delete data.action_type_name
        delete data.offer_type_name
        delete data.score
        delete data.offer_short_description
         data.offer_id = parseFloat(offerID) 
         data.offer_code = data.offer_code
         data.offer_name = data.offer_name
         data.price = parseFloat(data.price)
         data.position = parseFloat(data.position)
      
    }

    



 return datas


}
   

        
    
    
    }

     switchData(dataOffers05,dataOffers10,res,postion){

       


       
      if ( dataOffers10.data === undefined && dataOffers05.data === undefined ) {
       
        
         // numebr not found
       
        res.status(400).json({
            dynamic: dataOffers10,
            static: dataOffers05
            
        })

      } else if ( dataOffers10.data === undefined) {
       
        
        const data05 = this.labeleOffers05(dataOffers05.data)

        const dataFiltered05 = filterData.filterPostion(data05,postion)
        res.status(200).json({
            static: dataFiltered05,
            dynamic : dataOffers10
        })

      }else if  (dataOffers05.data === undefined ) {
       
        res.status(200).json({
            dynamic: this.labeleOffers10(dataOffers10.data),
            static: dataOffers05
          })
           
        

      } else if  (dataOffers10.data !== undefined && dataOffers05.data !== undefined) {
    
           const data05 = this.labeleOffers05(dataOffers05.data)
           const data10 = this.labeleOffers10(dataOffers10.data)
           
           const dataFiltered05 = filterData.filterPostion(data05,postion)
           const dataMerged = this.mergeOffers(dataFiltered05,data10)
           res.status(200).send(dataMerged)
      }
    }

    checkOffer10(offer_id){

        const offerStr = offer_id.toString()
        const offer10  = parseInt(offerStr.slice(-1))
           
        return offer10 === 1
         
    }
    


  







}//Class 


module.exports = DataService;


