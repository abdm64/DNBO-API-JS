const app = require('../app')
const request = require('supertest');
const dbssSvc = require('../src/facebook/DbssNetworkService')
const  userData = {
    msisdn : 783606207,
    channel_id : 18
}




it ( 'returen false and amount zero when user post paid ', async () => {


let userInfo =  await dbssSvc.getDSubsInfo(userData)
const substype = userInfo.pripaid 





expect(substype).toBeTruthy()



})


it(' it return less or equal than the amount of the msisdn', async ()=>{
    let userInfo = await dbssSvc.getDSubsInfo(userData)
    let amount = userInfo.amount

let response = await request(app)
                     .post('/dnbo-dte/api/v1/PresentOffers')   
                     .send(userData)
                     .expect(200)

                     
                    


//expect(response.length).toBe.(2)


})


const getDbssinfo = async (reqData) => {

return  await dbsssvc.getDSubsInfo(reqData)

}