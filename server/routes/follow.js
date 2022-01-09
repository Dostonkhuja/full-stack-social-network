const router = require('express').Router()
const auth = require('../middleware/auth')
const {User} = require("../models/users")
const mongoose = require('mongoose')
const _ = require('lodash')
const decoded = require('../middleware/decoded')

//follow
router.post('/:id', auth, async (req, res) => {
    //objectId ga tekshiramiz
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('ID standart objectId emas')

    //o'z o'ziga follow bosilsa false qaytarib beramiz
    if (req.params.id === req.user._id)
        return res.status(200).send({follow: false})

    //foydalanuvchini bor yoki yo'qligini tekshiramiz
    const user = await User.findById(req.params.id, 'followed')
    const ownerUser = await User.findById(req.user._id,'following')
    if (!user || !ownerUser)
        return res.status(404).send('bunday foydalanuvchi mavjud emas')

    //takroran follow bosilish holatida true qaytarib beramiz
    if (user.followed.includes(req.user._id)) {
        return res.status(200).send({follow: true})
    }

    //hammasi joyida bo'lsa muvaffaqiyatli follow true qaytarib beramiz
    user.followed.push(req.user._id)
    ownerUser.following.push(req.params.id)
    user.followedCount = user.followed.length
    ownerUser.followingCount = ownerUser.following.length
    await user.save()
    await ownerUser.save()
    res.status(200).send({follow: true})
})

//unfollow
router.delete('/:id', auth, async (req, res) => {
    //objectId ga tekshiramiz
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send('ID standart objectId emas')

    //foydalanuvchini bor yoki yo'qligini tekshiramiz
    let user = await User.findById(req.params.id, 'followed')
    let ownerUser = await User.findById(req.user._id,'following')
    if (!user || !ownerUser)
        return res.status(404).send('bunday foydalanuvchi mavjud emas')

    user.followed = user.followed.filter(f=> String(f) !== req.user._id)
    ownerUser.following = ownerUser.following.filter(f => String(f) !== req.params.id)

    user.followedCount = user.followed.length
    ownerUser.followingCount = ownerUser.following.length

    await user.save()
    await ownerUser.save()

    res.status(200).send({follow: false})
})

// get Followers
router.get('/followers/:id',decoded,async (req, res) => {
    const pageSize = req.query.pageSize
    const pageNumber = req.query.pageNumber

    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id)
    if (!isValidId)
        return res.status(400).send('ID tasdiqlangan standart objectId emas')

    const user = await User.findById(req.params.id)
        .select({followed:1})
        .populate({path:'followed',options:{skip:(pageNumber - 1) * pageSize,limit:pageSize,sort: {date:-1}},select:{firstName:1,lastName:1,photos:{large:1},followed:1,email:1}})

    if (req.user)
        user.followed.forEach(u => u.isFollow = u.followed.includes(req.user._id))

    res.send(user.followed)
})

// get Followed
router.get('/followed/:id',decoded,async (req, res) => {
    const pageSize = req.query.pageSize
    const pageNumber = req.query.pageNumber

    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id)
    if (!isValidId)
        return res.status(400).send('ID tasdiqlangan standart objectId emas')

    const user = await User.findById(req.params.id)
        .select({following:1})
        .populate({path:'following followed',options:{skip:(pageNumber - 1) * pageSize,limit:pageSize,sort: {date:-1}},select:{firstName:1,lastName:1,photos:{large:1},following:1,email:1,followed:1}})

    if (req.user)
        user.following.forEach(u => u.isFollow = u.followed.includes(req.user._id))

    res.send(user.following)
})

module.exports = router