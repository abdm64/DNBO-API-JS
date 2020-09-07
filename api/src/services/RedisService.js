require('dotenv').config();
const asyncRedis = require("async-redis");
let redisHost = process.env.REDIS_HOST || 'redis://127.0.0.1:6379' ;
const client = asyncRedis.createClient( redisHost );




 class RedisService {


        saveOffers(msisdn ,data){
            const dataString = JSON.stringify(data)
            client.setex(msisdn,3600, dataString)   

        }

    

       
  

     getValue = async(msisdn) => {
        let val = await client.get(msisdn);
        return val;
      };

  
     

    
        
     



 }//Class 


 module.exports = RedisService



































// const client = redis.createClient(REDIS_PORT);

// const app = express();

// // Set response
// function setResponse(username, repos) {
//   return `<h2>${username} has ${repos} Github repos</h2>`;
// }

// // Make request to Github for data
// async function getRepos(req, res, next) {
//   try {
//     console.log('Fetching Data...');

//     const { username } = req.params;

//     const response = await fetch(`https://api.github.com/users/${username}`);

//     const data = await response.json();

//     const repos = data.public_repos;

//     // Set data to Redis
//     client.setex(username, 3600, repos);

//     res.send(setResponse(username, repos));
//   } catch (err) {
//     console.error(err);
//     res.status(500);
//   }
// }

// // Cache middleware
// function cache(req, res, next) {
//   const { username } = req.params;

//   client.get(username, (err, data) => {
//     if (err) throw err;

//     if (data !== null) {
//       res.send(setResponse(username, data));
//     } else {
//       next();
//     }
//   });
// }

// app.get('/repos/:username', cache, getRepos);

// app.listen(5000, () => {
//   console.log(`App listening on port ${PORT}`);
// });