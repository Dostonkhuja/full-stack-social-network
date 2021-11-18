const router = require("express").Router()
const Conversation = require("../models/conversation")
const auth = require('../middleware/auth')

//new conv
router.post("/:reciveredId", auth, async (req, res) => {

    //agar conversation avvaldan mavjud bo'lsa uni topib qaytarib beramiz
    const conversation = await Conversation.find({'members': {$all: [req.user._id, req.params.reciveredId]}})
    if (conversation.length !== 0)
        return res.status(200).json(conversation[0])

    //agar conversation avvaldan mavjud bo'lmasa yangi qo'shamiz
    const newConversation = new Conversation({members: [req.user._id, req.params.reciveredId]})
    await newConversation.save()
    res.status(200).json(newConversation)
})

//get conv of a user
router.get("/", auth, async (req, res) => {
    let conversation = await Conversation
        .find({members: {$in: [req.user._id]}})
        .select({__v: 0})
        .populate(`members`, {name:1,photos:1,_id:1})

    conversation = conversation.map(c => {
        c.members = c.members.find(m => String(m._id) !== req.user._id)
        return c
    })

    res.status(200).json(conversation)
})

// get conv includes two userId
// router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
//     try {
//         const conversation = await Dialogs.findOne({
//             members: { $all: [req.params.firstUserId, req.params.secondUserId] },
//         });
//         res.status(200).json(conversation)
//     } catch (err) {
//         res.status(500).json(err)
//     }
// });

module.exports = router