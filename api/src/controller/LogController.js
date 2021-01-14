
const fs = require('fs');
const path = require('path')
const pino = require('pino')
const logger = pino()
const child = logger.child({ a: 'property' })








exports.log = (log) => {
  child.info(log)
  
}


