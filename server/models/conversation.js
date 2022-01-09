const mongoose = require("mongoose")
const Joi = require('joi')

const ConversationSchema = new mongoose.Schema(
    {
        members: {type: Array, ref: "user"},
        isNotReadingCount:{type:Number,default:0}
    }, { timestamps: true }
)

const conversationValidate = Joi.object({

})

module.exports = mongoose.model("Conversation", ConversationSchema)