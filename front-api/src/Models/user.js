const mongoose = require('mongoose')
// define the schema for our user model
var userSchema = mongoose.Schema({

    email:{type:String, unique:true, required:true},
    password: {type:String, required:true}, 
    
    
});



module.exports = mongoose.model('user', userSchema);
