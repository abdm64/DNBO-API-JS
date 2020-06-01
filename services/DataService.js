






class DataService {


mergeOffers(offers05,offers10){
    let dataArray = [ offers05,offers10];
    let dataMerged = [].concat(...dataArray)
   // console.log(dataMerged)

 
  



return dataMerged

}

labeleOffers(datas,status){
  


    for (let  data of datas){

        data.routeName = status

    }


    



    
  






 return datas
}





}


module.exports = DataService;