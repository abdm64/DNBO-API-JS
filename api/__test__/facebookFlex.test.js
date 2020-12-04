const app = require('../app')
const request = require('supertest');
const dbssSvc = require('../src/facebook/DbssNetworkService')
const  userData = {
    msisdn : 772354,
    channel_id : 18
}
const  userDbssInfo = getDbssinfo (userData)



it ( 'returen false and amount zero when user post paid ', async () => {
    // post paid user 
const postuser = {


}

let userInfo =  await dbssSvc.getDSubsInfo(postuser)
const substype = userInfo.pripaid 

const substype = false 



expect(substype).toBeFalsy()



})


it(' it return less or equal than the amount of the msisdn',()=>{





})


const getDbssinfo = async (reqData) => {

return  await dbsssvc.getDSubsInfo(reqData)

}