const mongoose = require("mongoose")
const Joi = require('joi')

const chatMessageSchema = new mongoose.Schema(
    {
        sender:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
        text: {type: String},
    },
    { timestamps: true }
)

const chatMessageValidate = Joi.object({
    sender:mongoose.Schema.Types.ObjectId,
    text:Joi.string()
})

module.exports = mongoose.model("ChatMessage", chatMessageSchema)
module.exports.chatMessageValidate = chatMessageValidate