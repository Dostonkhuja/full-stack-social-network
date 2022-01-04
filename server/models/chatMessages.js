const mongoose = require("mongoose")

const chatMessageSchema = new mongoose.Schema(
    {
        sender:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
        text: {type: String},
    },
    { timestamps: true }
)

module.exports = mongoose.model("ChatMessage", chatMessageSchema)