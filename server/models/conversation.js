const mongoose = require("mongoose")

const ConversationSchema = new mongoose.Schema(
    {
        members: {type: Array, ref: "user"},
        isNotReadingCount:{type:Number,default:0}
    }, { timestamps: true }
)

module.exports = mongoose.model("Conversation", ConversationSchema)