const express = require('express')
const app = express()
const config = require('./config/config')
const userController = require('./src/Controllers/userController')
const mongoose = require('mongoose')
const cors = require('cors');
const data = require('./uploads/dnbo_channel_id.json')
const fs = require('fs');




app.use(express.json())

app.use(cors()) 

app.use((req,res,next)=> {
  res.setHeader("Access-Control-Allow-Origin" ,"*");
  res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type , Accept"
  );
  res.setHeader(
      "Access-Control-Allow-Methods",
      "GET ,POST, PATCH, DELETE, OPTIONS"
  );
  next();
});


mongoose.set('useFindAndModify', false)

mongoose
.connect(config.db.connectionUri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
.then(() => {
  console.log( 'Connected to database!');
})
.catch(error => {
  console.log('Connection failed!');
  console.log(error);
});


app.get('/api/v1',(req,res)=>{


  res.status(201).json({
    message : " DJEZZY-IN-EMP API is working",
  
  });

})

app.get('/api/v1/data',(req,res)=>{


  res.status(201).json(data)

})

app.post('/api/v1/data',(req,res)=>{
let data = JSON.stringify(req.body) 
fs.writeFileSync('./uploads/dnbo_channel_id.json',data)
res.send()

})


app.use(userController)


app.listen(config.app.port, ()  => {
  console.log('app listening on port ' + config.app.port);
});