

//post paid number 784610605
const postpaidOffers = [

  {
      
    offer_id: 1461,
    offer_code: "DOVINTSPEEDMONTH15GoPOST",
    offer_name: "UAT Internet Mois 15 Go - POST",
    offer_price: 1000,
    postion:1,
    
  },
    {
  
        offer_id: 1421,
        offer_code: "DOVINTSPEEDDAY100MoPOST",
        offer_name: "UAT Internet Jour 100 Mo - POST",
        offer_price: 30,
        postion:2,
        
      }

      

]

const offersLess = { 
                 offer_id: 1521,
                 offer_code: "DOVINTSPEEDDAY1GoPRE", 
                 offer_name: "UAT Internet Jour 1 Go",
                 price: 100, 
                 position: 1
    
    }

    const offerBtl = { 
                     offer_id: 1171, 
                     offer_code: "YOUTUBEUNLIMITED", 
                     offer_name: "UAT 600DA=illimité Youtube/30Jours", 
                     price: 600, 
                     position: 2

                        }

    const tranquiloOffer = (offers) => {
        const  offer_ids = offers.map((offer) => offer.offer_id)
        const  checkTranquilloAvailable = offer_ids.includes(1521)

        return offers.filter((offer) = offer.offer_id === 1521 )


    }


module.exports ={

    postpaidOffers, offersLess,offerBtl,tranquiloOffer

    
  }
  
  
  