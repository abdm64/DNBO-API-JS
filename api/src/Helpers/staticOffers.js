

//post paid number 784610605
const postpaidOffers = [

  {
      
    offer_id: 1611,//1611
    offer_code: "DOVINTSPEEDMONTH15GoPOST",
    offer_name: "Internet Mois 15 Go - POST",
    price: 1000,
    position:1,
    
  },
    {
  
        offer_id: 1591,//1591
        offer_code: "DOVINTSPEEDDAY100MoPOST",
        offer_name: "Internet Jour 100 Mo - POST",
        price: 30,
        position:2,
        
      }

      

]

const offersLess = { 
                 offer_id: 1091,//1091
                 offer_code: "DOVINTSPEEDDAY1GoPRE", 
                 offer_name: "Internet 100DA =1Go\\/24H",
                 price: 100, 
                 position: 1,



                 
                 //atl default
    
    }

    const offerBtl = { 
      
                     offer_id: 1181, //1181
                     offer_code: "YOUTUBEUNLIMITED", 
                     offer_name: "600DA=illimité Youtube/30Jours", 
                     price: 600, 
                     position: 2

                
                
                    }

                    const hybridOffers = [
                      {
                          offer_id: 1081,
                          offer_code: "DOVINTSPEEDMONTH15GoPRE",
                          offer_name: "Internet Mois 15 Go",
                          price: 1000,
                          position: 1
                      },
                      {
                          offer_id: 1661,
                          offer_code: "DOVINTSPEEDDAY100MoPRE",
                          offer_name: "Internet Jour 100 Mo",
                          price: 30,
                          position: 2
                      }
                  ]
                  







    const tranquiloOffer = (offers) => {
        const  offer_ids = offers.map((offer) => offer.offer_id)
        const  checkTranquilloAvailable = offer_ids.includes(1381)

//138


        return offers.filter((offer) => offer.offer_id === 1381)


    }


    const simDataOffers = [
        {
            "offer_id": 44444, 
            "offer_code": " PrepaidDjezzyInternet1000",
            "offer_name": " Prepaid Djezzy Internet 1000",
            "price": 1000,
            "position": 1
        },
        {
            "offer_id": 55555, 
            "offer_code": " PrepaidDjezzyInternet4003",
            "offer_name": " Internet 4000 150GB monthly(180days)",
            "price": 4000,
            "position": 2
        },
    
    ]


    const getOffersType = (offers) => {
      let atl  = []
      let btl  = []
      let postOffers = []
      let defaultAtl = []
      let defaultBtl= []
      let tranquiloOffer  = []
  
  //need factoring it (o) is the worst 
  
  
      for (let offer of offers ) {
         
  
              for (let offer_id_type of offer_id_types ) {
                 
                  if ( offer.offer_id === offer_id_type.offer_id) {
                 
                     
                    
                      if (offer_id_type.offer_type === 0 || offer_id_type.offer_type === 6){
                       
                       
                          atl.push(offer)
                      } else if (offer_id_type.offer_type === 1 || offer_id_type.offer_type === 7) {
                        
                        
                          btl.push(offer)
                      
  
  
                      } else if (offer_id_type.offer_type === 2) {
  
                          postOffers.push(offer)
                      } else if (offer_id_type.offer_type === 3  || offer_id_type.offer_type === 6) {
  
                          defaultAtl.push(offer)
                      } else if (offer_id_type.offer_type === 4 || offer_id_type.offer_type === 7){
  
                          defaultBtl.push(offer)
                      } else if (offer_id_type.offer_type === 5){
                        tranquiloOffer.push(offer)
                      }
  
                  }
  
  
  
              }
            
  
      }
  
    
  
  
     
  
      return   { atl ,btl , postOffers,defaultBtl,defaultAtl,tranquiloOffer}
  
  
  }


module.exports ={

    postpaidOffers, 
    offersLess,
    offerBtl,  
    hybridOffers,
    tranquiloOffer, 
    getOffersType, 
    simDataOffers

    
  }
  
  
  