const mongoose = require('mongoose')
const Joi = require('joi')

const commentsShema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    comment: {type: String, default: ''},
    statusId: {type: mongoose.Schema.Types.ObjectId},
},{ timestamps: true })

const Comments = mongoose.model('comments', commentsShema)

const commentsValidate = Joi.object({
    user:mongoose.Schema.Types.ObjectId,
    comment:Joi.string(),
    statusId:mongoose.Schema.Types.ObjectId
})

module.exports.Comments =  Comments
module.exports.commentsValidate = commentsValidate