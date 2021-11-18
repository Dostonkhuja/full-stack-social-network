const mongoose = require("mongoose")

const ConversationSchema = new mongoose.Schema(
    {members: {type: Array, ref: "user"}},
    { timestamps: true }
)

module.exports = mongoose.model("Conversation", ConversationSchema)