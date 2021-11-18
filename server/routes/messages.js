const router = require("express").Router()
const Message = require("../models/messages")

//add
router.post("/", async (req, res) => {
    const newMessage = new Message(req.body)
    await newMessage.save()
    res.status(200).json(newMessage)
})

//get
router.get("/:conversationId", async (req, res) => {
    const messages = await Message.find({conversationId: req.params.conversationId})
    res.status(200).json(messages)
})

module.exports = router