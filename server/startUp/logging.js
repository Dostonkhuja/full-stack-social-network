require('express-async-errors')
const winston = require('winston')
require('winston-mongodb')

module.exports = () => {
    //loglarni silly darajasida consolega uzatamiz
    winston.add(new winston.transports.Console({level: 'silly'}))
    //error darajadagi loglarni file qilib loyihamiz papkasiga joylashtiramiz
    winston.add(new winston.transports.File({filename: 'social-network-logs.log', level: 'error'}))
    //error darajadagi loglarni databasega yozamiz
    winston.add(new winston.transports.MongoDB({
            db: "mongodb://localhost/social-network-logs", level: 'error', options: {useUnifiedTopology: true}
        },
    ))
    //dasturimizdagi exeption xatolarini ilib olib consolega chiqaramiz va file tarzida loyihamiz papkasiga kiritamiz
    winston.exceptions.handle(new winston.transports.Console({level: 'silly'}), new winston.transports.File({
        filename: 'social-network-logs.log',
        level: 'error'
    }))
    //unhandledRejection hatolariga obuna bo'lamiz va ushbu hato sodir bo'lgan vaqtda exeption hatoligini yuzaga keltiramiz
    process.on('unhandledRejection', ex => {
        throw ex
    })
    // process.on('uncaughtException', ex => {
    //     winston.error(('uncaughtException xatosi \n' + ex.message, ex))
    //     process.exit(1)
    // })
    //
    // process.on('unhandledRejection', ex => {
    //     winston.error((ex.message, ex))
    //     process.exit(1)
    // })
}