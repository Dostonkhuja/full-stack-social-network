const router = require('express').Router()
const auth = require('../middleware/auth')
const {User} = require("../models/users")
const mongoose = require('mongoose')
const _ = require('lodash')

//get follow result by id
router.get('/:id', auth, async (req, res) => {
    //objectId ga tekshiramiz
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('ID standart objectId emas')

    //foydalanuvchini bor yoki yo'qligini tekshiramiz
    let user = await User.findById(req.params.id, 'followed')
    if (!user)
        return res.status(404).send('bunday foydalanuvchi mavjud emas')

    const result = user.followed.includes(req.user._id)
    res.send({follow: result})
})

//follow
router.post('/:id', auth, async (req, res) => {
    //objectId ga tekshiramiz
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('ID standart objectId emas')

    //o'z o'ziga follow bosilsa fasle qaytarib beramiz
    if (req.params.id === req.user._id)
        return res.status(200).send({follow:false})

    //foydalanuvchini bor yoki yo'qligini tekshiramiz
    const user = await User.findById(req.params.id, 'followed')
    if (!user)
        return res.status(404).send('bunday foydalanuvchi mavjud emas')

    //takroran follow bosilish holatida true qaytarib beramiz
    if (user.followed.length !== 0 && user.followed.filter(f => {
        String(f._id) === req.params.id
    })) {
        return res.status(200).send({follow:true})
    }

    //hammasi joyida bo'lsa muvaffaqiyatli follow true qaytarib beramiz
    user.followed.push({_id: req.user._id})
    await user.save()
    res.send({follow:true})
})

//unfollows
router.delete('/:id', auth, async (req, res) => {
    //objectId ga tekshiramiz
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('ID standart objectId emas')

    //foydalanuvchini bor yoki yo'qligini tekshiramiz
    const user = await User.findById(req.params.id, 'followed')
    if (!user)
        return res.status(404).send('bunday foydalanuvchi mavjud emas')

    const removed = _.remove(user.followed, item => String(item) === req.user._id)
    if (removed.length > 0)
        await user.save()
    return res.status(200).send({follow: false, message: "unfollow muvaffaqiyatli amalga oshirildi"})
})

module.exports = router