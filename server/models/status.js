const mongoose = require('mongoose')
const Joi = require('joi')

const statusSchema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    text: {type: String, default: ''},
    photoFile: {type: Object, default: null},
    video: {type: String, default: null},
    likeCount:{type:Number,default:0},
    liked:[{type: mongoose.Schema.Types.ObjectId,ref:'user'}],
    commentsCount:Number,
    comments:[{type: mongoose.Schema.Types.ObjectId,ref:'comments'}]
},{ timestamps: true})

const Status = mongoose.model('status', statusSchema)

const statusValidate = Joi.object({
    user:mongoose.Schema.Types.ObjectId,
    text:Joi.string().allow(''),
    photoFile:Joi.string().allow(null),
    video:Joi.string().allow(null),
    likeCount:Joi.number(),
    liked:Joi.array().items(mongoose.Schema.Types.ObjectId),
    commentsCount:Joi.number(),
    comments:Joi.array().items(mongoose.Schema.Types.ObjectId),
})

module.exports.Status =  Status
module.exports.statusValidate = statusValidate