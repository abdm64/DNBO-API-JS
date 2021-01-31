
var fs = require('fs')
var pinoms = require('pino-multi-stream')
var streams = [
  {stream: fs.createWriteStream('./src/logs.log')}
]
var fileLogger = pinoms({streams: streams})
const pino = require('pino')
const logger = pino()
const child = logger.child({ e: 'property' })







exports.log = (log) => {

  child.info(log)
  fileLogger.info(log)
  
}


