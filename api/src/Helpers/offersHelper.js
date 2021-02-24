



const offer_id_types = require('../files/offer_id_type.json')
const staticOffers = require('../Helpers/staticOffers')


const  filterOfferByAmount = ( offer10,amount) => {



    let offers = []
    
  const atl = getOffersType(offer10).atl
  const btl = getOffersType(offer10).btl
  let validAtlArr = validOffers(atl,amount)
  let validBtlArr = validOffers(btl, amount)
  const atlLength =  validAtlArr.length //alwayse more the 2 
  const btlLength = validBtlArr.length
  let validAtl = validAtlArr[validAtlArr.length - 1]
  let validBtl;


   
   
  

 switch (true) {

  case (btlLength === 0 && atlLength === 0):
   
    validBtl = staticOffers.offerBtl
    validAtl = staticOffers.offersLess
    break;
  case (btlLength === 0 && atlLength > 1):
        validBtl = staticOffers.offerBtl
        validAtl = validAtlArr[validAtlArr.length - 1]
  break;
  case (btlLength === 1 && atlLength > 1):
    validBtl =  validBtl = validBtlArr[validBtlArr.length - 1]
    validAtl = validAtlArr[validAtlArr.length - 1]
break;
case (btlLength === 1 && atlLength > 1):
    validBtl =  validBtl = validBtlArr[validBtlArr.length - 1]
    validAtl = validAtlArr[validAtlArr.length - 1]
break;

    

    

    
   









  default:
   //BTL and ATL has more then one element 

    validBtl = validBtlArr[validBtlArr.length - 1]
    validAtl = validAtlArr[validAtlArr.length - 1]
    
   if(validAtl.price  === validBtl.price){

    validBtl = validBtlArr[validBtlArr.length - 2]
    if ( validBtl === undefined ){
        
        validAtl.position = 1
        offers.push(validAtl)
        return offers
    } 



   }
}





//    if(validAtl.price  === validBtl.price){

//     validBtl = validBtlArr[validBtlArr.length - 2]
//     if ( validBtl === undefined ){
        
//         validAtl.position = 1
//         offers.push(validAtl)


//         return offers
//     } 



//    }


   
    validAtl.position = 1
    validBtl.position = 2
   offers.push(validAtl)
  offers.push(validBtl)


   
   
   
   
    return offers
}
//

const getOffersType = (offers) => {
    let atl  = []
    let btl  = []
    let postOffers = []
    let hybridOffers = []

//need factoring it (o) is the worst 


    for (let offer of offers ) {
       

            for (let offer_id_type of offer_id_types ) {
               
                if ( offer.offer_id === offer_id_type.offer_id) {
               
                   
                  
                    if (offer_id_type.offer_type === 0 ){
                
                        atl.push(offer)
                    } else if (offer_id_type.offer_type === 1 ) {
                      
                      
                        btl.push(offer)
                    


                    } else if (offer_id_type.offer_type === 2) {

                        postOffers.push(offer)

                    } else if (offer_id_type.offer_type === 3  ) {

                        hybridOffers.push(offer)
                    } 

                }



            }
          

    }

    

  
//, postOffers,defaultBtl,defaultAtl,tranquiloOffer

   

    return   { atl ,btl }


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


module.exports = { filterOfferByAmount,validOffers }