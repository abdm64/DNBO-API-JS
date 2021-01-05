



const offer_id_types = require('../files/offer_id_type.json')
const staticOffers = require('../Helpers/staticOffers')


const  filterOfferByAmount = ( offer10,amount) => {

 

    let offers = []
    
  const atl = getOfferType(offer10).atl
  const btl = getOfferType(offer10).btl

 
  
  let validAtlArr = validOffers(atl,amount)
  let validAtl = validAtlArr[validAtlArr.length - 1]
  
   let validBtlArr = validOffers(btl, amount)
   
  const arr =  validBtlArr.slice(Math.max(validBtlArr.length - 1 , 1))
  
   let validBtl = validBtlArr[validBtlArr.length - 1]




   if(validAtl.price  === validBtl.price){

    validBtl = validBtlArr[validBtlArr.length - 2]
    if ( validBtl === undefined ){
        validBtl = staticOffers.offerBtl
    } 



    




   }

    validAtl.position = 1
    validBtl.position = 2
   offers.push(validAtl)
  offers.push(validBtl)


   
   
   
   
    return offers
}
//

const getOfferType = (offers) => {
    let atl  = []
    let btl  = []
    let offersIds = []




    for (let offer of offers ) {
       

            for (let offer_id_type of offer_id_types ) {
               
                if ( offer.offer_id === offer_id_type.offer_id) {
               
                    offersIds.push(offer.offer_id) 
                  
                    if (offer_id_type.offer_type === 0){
                     
                     
                        atl.push(offer)
                    } else if (offer_id_type.offer_type === 1) {
                      
                      
                        btl.push(offer)
                    


                    }

                }



            }
          

    }

  

  let data = {

    atl : atl ,
    btl : btl 
}

   

    return  data


}
const validOffers = (offersArray,amount) =>{
    
    
    
 let offerAmount = offersArray.filter((offer)=>{
        let price =  parseInt(offer.price)
    

        return   price <= amount
    })
    

    .sort((a,b) => {


  return a.price - b.price
    })
  

    return offerAmount


}


module.exports = { filterOfferByAmount }