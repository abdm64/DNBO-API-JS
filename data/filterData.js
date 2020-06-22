class FilterData {

    filterPostion(data,postion){
        const inn =  postion.in?.substring(1, postion.in?.length-1).split(',').map(Number)
        const out =  postion.out?.substring(1, postion.out?.length-1).split(',').map(Number)
        const ordr = postion.ordr
      

        if ( postion === undefined){




            return data

        } else if ( postion.out !== undefined) {
            
            
          return  this.filterout(data,out,ordr)
           
          

        } else if ( postion.in !== undefined){
          
           

            return this.filterin(data,inn,ordr)
        } else  if ( postion.ordr !== undefined ) {
           
           
           return this.filterOrder(data,ordr)
           
        } else {

            return data
        }

      
    }

    filterout(data,positionOut,ordr){
        
       
            
      
            for ( let j of positionOut){
                
                for(let i = 0; i < data.length; i++) {
    
                if( data[i].position === j) {

                    this.removeElement(data,data[i])
                      
    
                         }
                 }           
            
            }
    
            const fiterdD = this.filterOrder(data,ordr)
  
              return  fiterdD

    }

    filterin(data,positionIn,ordr){

        let filterDataIn = [];
        
        for ( let i of positionIn){
           
        // const dataFiltered = data.filter( e => e.position === i ) 
        
            for ( let datae of data){
                if ( datae.position === i){

                    filterDataIn.push(datae)
                }

            }
        
        }
   const fiterdD = this.filterOrder(filterDataIn,ordr)
         

            return  fiterdD


    }

    filterOrder(data,positionOrder){

        if (positionOrder === undefined){

            return data
        } else {


            return data.slice(0,positionOrder)
        }


       


    }

     removeElement(array, elem) {
        
        var index = array.indexOf(elem);
        if (index > -1) {
            array.splice(index, 1);
        }
        
    }









}// Class 


module.exports = FilterData;