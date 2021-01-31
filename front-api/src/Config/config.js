var dbHost = process.env.dbHost || "localhost";
var port = process.env.port  || 3000
module.exports = {
  name: "dnbo",
  title: "dnbo",
  app: {
    host: process.env.url || "localhost",
    port: port
  },
  author: "abdm64",
  version: "1.0.0",
  db: {
    connectionUri: "mongodb://" + dbHost + ":27017/dnbo",
    params: {},
    
  }
};
