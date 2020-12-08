//@ts-check
const offerData = require('../DataManager/offerData');
const filterData = require('../DataManager/filterData');
const redisService = require('./RedisService')













const mergeOffers = (offers05,offers10) =>{
   
   

  

    let dataMerged = { 

        static : offers05,
        dynamic : offers10
    }

      

 
  



return dataMerged

}

const labeleOffers05 = (datas) =>{ 
   
    let data05 = [];
    

    for (let  data of datas){
        const offerID = data.offer_id

        let dataret = {
            offer_id : parseFloat((offerID.toString() + '5')) ,
            offer_code: offerData.getoffersById(offerID).offer_code,
            offer_name: data.offer_name,
            price: offerData.getoffersById(offerID).price,
            position: data.position

    }
        data05.push(dataret)
        
      
}

return data05

}



const labeleOffers10 = (datas) =>{ 

    let data10 = [];
    
    
if ( datas === undefined){

    return
} else {

    for (let  data of datas){
        const offerID = data.offer_id.toString() + '1'
        let dataret = {
                //
                offer_id : parseFloat(offerID),
                offer_code: data.offer_code,
                offer_name: data.offer_name,
                price: parseFloat(data.price),
                position: parseFloat(data.position)
                
        }

        data10.push(dataret)
      
    }

    



 return data10


}
   

        
    
    
    }
   // switchData(msisdn,dataOffers05,dataOffers10,res,postion
     const switchData = (sentData) =>{ 
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

            redisService.saveOffers(msisdn,saveData)

        }
       


      } else if ( dataOffers10.data === undefined) {
     
        const data05 = labeleOffers05(dataOffers05.data)
        const dataFiltered05 = filterData.filterPostion(data05,reqPrams )
      typeData(dataFiltered05,dataOffers10,res,typeInt)
  
        
                
        saveData = {
            static: data05,
            dynamic: dataOffers10
            
        }
        
        if (channel_id === 18) {
            redisService.saveOffers(msisdn,saveData)

        }
      

      }else if  (dataOffers05.data === undefined ) {
       
          let data10 = labeleOffers10(dataOffers10.data)
         
          typeData(dataOffers05,data10,res,typeInt)
       
         

          saveData = {
            static: dataOffers05,
            dynamic: data10
            
         }
   
         if (channel_id === 18) {
            redisService.saveOffers(msisdn,saveData)

        }
           
        

      } else if  (dataOffers10.data !== undefined && dataOffers05.data !== undefined) {
    
           const data05 = labeleOffers05(dataOffers05.data)
           const data10 = labeleOffers10(dataOffers10.data) 
           const dataFiltered05 = filterData.filterPostion(data05,reqPrams )
           typeData(dataFiltered05,data10,res,typeInt)
           saveData = {
            static: data05,
            dynamic: data10
         }
         

         if (channel_id === 18) {
            redisService.saveOffers(msisdn,saveData)

        }
      

      }
    }

    const checkOffer10 = (offer_id) =>{ 

        const offerStr = offer_id.toString()
        const offer10  = parseInt(offerStr.slice(-1))
           
        return offer10 === 1
         
    }
    


 const  typeData = (data05,data10,res,typeInt) =>{ 


    
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








module.exports = { mergeOffers,labeleOffers05,labeleOffers10,switchData,checkOffer10 ,typeData}





