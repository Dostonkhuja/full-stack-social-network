const mongoose = require("mongoose")
const Joi = require('joi')

const MessageSchema = new mongoose.Schema(
    {
        conversationId: {type: String},
        sender: {type: String},
        text: {type: String},
        isRead:{type:Boolean,default:false}
    },
    { timestamps: true }
)

const messageValidate = Joi.object({
    conversationId:Joi.string(),
    sender:Joi.string(),
    text:Joi.string(),
    isRead:Joi.boolean()
})

module.exports = mongoose.model("Message", MessageSchema)
module.exports.messageValidate = messageValidate
