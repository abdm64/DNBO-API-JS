const morgan = require('morgan');
const fs = require('fs');
const path = require('path')

const accessLogStream = fs.createWriteStream(path.join('./logs/', 'access.log'), { flags: 'a' })
const errorLogStream = fs.createWriteStream(path.join('./logs/', 'error.log'), { flags: 'a' })







exports.logAccess = () => {
  morgan('combined', { stream: accessLogStream })
  
}


exports.logErr = () => {

  morgan('combined', {
    skip: function (req, res) { return res.statusCode < 400 }
  }, { stream : errorLogStream}
     
}