const mongoose = require('mongoose')

const statusSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId},
    text: {type: String, default: ''},
    photoFile: {type: Object, default: null},
    video: {type: String, default: null},
    likeCount:{type:Number,default:0},
    liked:[{type: mongoose.Schema.Types.ObjectId,ref:'user'}],
    commentsCount:Number,
    comments:[{type: mongoose.Schema.Types.ObjectId,ref:'comments'}]
},{ timestamps: true})


const Status = mongoose.model('status', statusSchema)

// const statusValidate = Joi.object({
//     // userId: Joi.string().min(1).max(1024)
// })

module.exports.Status =  Status