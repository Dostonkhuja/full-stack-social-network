const mongoose = require('mongoose')
const winston = require('winston')

module.exports = () => {
    mongoose.connect(process.env.db).then(()=>{winston.debug('mongodbga ulanish hosil qilindi')})
}