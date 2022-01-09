const {validate, User} = require("../models/users")
const _ = require("lodash")
const bcrypt = require("bcrypt")
const router = require('express').Router()
const auth = require('../middleware/auth')

//Auth me
router.get('/me', auth, async (req, res) => {
    let me = await User
        .findById(req.user._id)
        .select({password: 0, __v: 0,isFollow:0})
        .populate({path:'following followed myPhotos',options:{limit:9,sort: {date:-1}},select:{firstName:1,lastName:1,photos:{large:1},photo:1}})
        .populate({path:'status',populate:{path:'comments', options: {sort: {createdAt:-1},limit: 2}, populate:{path:'user', select:{lastName:1,firstName:1,photos:{large:1}}}},})
        .populate({path:'status',options:{sort: {createdAt:-1},limit:5},populate:{path:'liked', select:{lastName:1,firstName:1,photos:{large:1},isFollow:1,_id:1}}})
        me.status = me.status.map(s=>s.liked = s.liked.map(l=> l.isFollow = me.following.some(u=>String(u._id) === String(l._id))))

    if (!me)
        return res.status(404).send('bunday foydalanuvchi mavjud emas')

    res.send(me)
})

//sign In
router.post('/signIn', async (req, res) => {
    const {error} = validate.validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    let user = await User.findOne(_.pick(req.body, ['email']))
    if (!user)
        return res.status(400).send('email yoki parol noto\'g\'ri')

    const isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isValidPassword)
        return res.status(400).send('email yoki parol noto\'g\'ri')

    const token = user.generateAuthToken()
    res.header("x-auth-token", token).send(true)
})

//sign Up
router.post('/signUp', async (req, res) => {
    const {error} = validate.validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    let user = await User.findOne(_.pick(req.body, ['email']))
    if (user)
        return res.status(400).send('bunday email bilan ro\'yxatdan o\'tilgan')

    user = new User(_.pick(req.body, ['email', 'password', 'lastName','firstName']))
    const salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()
    res.send(_.pick(user, ['_id', 'email','lastName','firstName']))
})

//logout
router.delete('/logout', auth, (req, res) => {
    res.send(true)
})

module.exports = router