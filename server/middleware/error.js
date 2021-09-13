const winston = require('winston')

module.exports = (err,req,res,next)=>{
    winston.error(err.message,err)
    res.status(500).send('serverga bog\'lanishda kutilmagan xato yuz berdi')
}