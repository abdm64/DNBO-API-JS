//@ts-check
const OfferData = require('../UploadsManager/offerData');
const FilterData = require('../UploadsManager/filterData');
const RedisService = require('./RedisService')

const offerData = new OfferData();
const filterData = new FilterData();
const redisServie = new RedisService();






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
   // switchData(msisdn,dataOffers05,dataOffers10,res,postion
     switchData(sentData){
         const msisdn = sentData.msisdn
         const dataOffers10 = sentData.dataOffers10
         const dataOffers05 = sentData.dataOffers05
         const res = sentData.res
         const reqPrams = sentData.reqPrams
         const channel_id = sentData.channel_id
        let typeInt = parseInt(reqPrams.type)
        let saveData;
        
       


       
      if ( dataOffers10.data === undefined && dataOffers05.data === undefined ) {
       
        
         // numebr not found
         saveData = {
            dynamic: dataOffers10,
            static: dataOffers05
         }
         
       
        res.status(400).json({
            static: dataOffers05,
            dynamic: dataOffers10
           
            
        })
        if (channel_id === 18) {

            redisServie.saveOffers(msisdn,saveData)

        }
       


      } else if ( dataOffers10.data === undefined) {
     
        const data05 = this.labeleOffers05(dataOffers05.data)
        const dataFiltered05 = filterData.filterPostion(data05,reqPrams )
        this.typeData(dataFiltered05,dataOffers10,res,typeInt)
  
        
                
        saveData = {
            static: data05,
            dynamic: dataOffers10
            
        }
        
        if (channel_id === 18) {
            redisServie.saveOffers(msisdn,saveData)

        }
      

      }else if  (dataOffers05.data === undefined ) {
       
          let data10 = this.labeleOffers10(dataOffers10.data)
         
          this.typeData(dataOffers05,data10,res,typeInt)
       
         

          saveData = {
            static: dataOffers05,
            dynamic: data10
            
         }
   
         if (channel_id === 18) {
            redisServie.saveOffers(msisdn,saveData)

        }
           
        

      } else if  (dataOffers10.data !== undefined && dataOffers05.data !== undefined) {
    
           const data05 = this.labeleOffers05(dataOffers05.data)
           const data10 = this.labeleOffers10(dataOffers10.data) 
           const dataFiltered05 = filterData.filterPostion(data05,reqPrams )
           this.typeData(dataFiltered05,data10,res,typeInt)
           saveData = {
            static: data05,
            dynamic: data10
         }
         

         if (channel_id === 18) {
            redisServie.saveOffers(msisdn,saveData)

        }
      

      }
    }

    checkOffer10(offer_id){

        const offerStr = offer_id.toString()
        const offer10  = parseInt(offerStr.slice(-1))
           
        return offer10 === 1
         
    }
    


  typeData(data05,data10,res,typeInt){


    
    if ( typeInt === 0){
        res.status(200).json(
            data05
          
        )
        

    
} else if ( typeInt === 1 ){
    res.status(200).json(
        
        data10
    )

  
} else {
    res.status(200).json({
        static: data05,
        dynamic : data10
    })
    
}

  }







}//Class 


module.exports = DataService;


