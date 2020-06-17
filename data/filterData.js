




class FilterData {

    filterPostionIn(data,postion){

        if ( postion === undefined) {

            return data
        } else {

            let filterDataIn = [];
        
            for ( let i of postion){
               
            // const dataFiltered = data.filter( e => e.position === i ) 
            
                for ( let datae of data){
                    if ( datae.position === i){
    
                        filterDataIn.push(datae)
                    }
    
                }
            
            }
    
             
    
                return filterDataIn


        }
       
    }

    filterPostion(data,postion){


        if ( postion === undefined){




            return data

        } else if ( postion.out === undefined) {
            console.log(this.filterin(data,postion.in))

          return  this.filterin(data,postion.in)
          

        } else if ( postion.in === undefined){
          
            

            return this.filterout(data,postion.out)
        } else {
           
            return data
           
        }

      
    }

    filterout(data,positionOut){
        
      
            
      
            for ( let j of positionOut){
                
                for(let i = 0; i < data.length; i++) {
    
                if( data[i].position === j) {

                    this.removeElement(data,data[i])
                      
    
                         }
                 }           
            
            }
    
            
  
                return data

           

        


    }

    filterin(data,positionIn){

        let filterDataIn = [];
        
        for ( let i of positionIn){
           
        // const dataFiltered = data.filter( e => e.position === i ) 
        
            for ( let datae of data){
                if ( datae.position === i){

                    filterDataIn.push(datae)
                }

            }
        
        }

         

            return filterDataIn


    }

    filterOrder(data,positionOrder){

        


        return data.slice(0,positionOrder)


    }

     removeElement(array, elem) {
        
        var index = array.indexOf(elem);
        if (index > -1) {
            array.splice(index, 1);
        }
        
    }









}// Class 


module.exports = FilterData;