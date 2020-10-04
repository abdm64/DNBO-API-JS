

//@ts-check


const     filterPostion = (data,postion) =>{
        const inn =  postion.in?.substring(1, postion.in?.length-1).split(',').map(Number)
        const out =  postion.out?.substring(1, postion.out?.length-1).split(',').map(Number)
        const ordr = postion.ordr
        const type = parseInt(postion.type)


        if ( !Array.isArray(data)) {


            return data
        } 
      

        if ( postion === undefined){




            return data

        } else if ( postion.out !== undefined) {
            
            
          return  filterout(data,out,ordr)
           
          

        } else if ( postion.in !== undefined){
          
           

            return filterin(data,inn,ordr)
        } else  if ( postion.ordr !== undefined ) {
           
           
           return filterOrder(data,ordr)
           
        }  else {

            return data
        } 
    
    

      
    }

 const filterout = (data,positionOut,ordr)=>{
        
       
            
      
            for ( let j of positionOut){
                
                for(let i = 0; i < data.length; i++) {
    
                if( data[i].position === j) {

                   removeElement(data,data[i])
                      
    
                         }
                 }           
            
            }
    
            const fiterdD = filterOrder(data,ordr)
  
              return  fiterdD

    }

  const   filterin= (data,positionIn,ordr)=>{

        let filterDataIn = [];
        
        for ( let i of positionIn){
           
        // const dataFiltered = data.filter( e => e.position === i ) 
        
            for ( let datae of data){
                if ( datae.position === i){

                    filterDataIn.push(datae)
                }

            }
        
        }
   const fiterdD = filterOrder(filterDataIn,ordr)
         

            return  fiterdD


    }

  const filterOrder = (data,positionOrder) =>{

        if (positionOrder === undefined){

            return data
        } else {


            return data.slice(0,positionOrder)
        }


       


    }

   const  removeElement = (array, elem)=> {
        
        var index = array.indexOf(elem);
        if (index > -1) {
            array.splice(index, 1);
        }
        
    }



  const  filterType = (data,type) =>{


        if (type === 0){

            return data.static
        } else if  (type === 1) {



            return data.dynamic
        }


    }





//


module.exports = {
    filterType,
    removeElement ,
    filterOrder,
    filterin,
    filterout,
    filterPostion ,


}