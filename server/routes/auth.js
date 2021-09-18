const {validate, User} = require("../models/users")
const _ = require("lodash")
const bcrypt = require("bcrypt")
const router = require('express').Router()
const auth = require('../middleware/auth')
const {Schema} = require("mongoose");

//Auth me
router.get('/me', auth, async (req, res) => {
    const me = await User.findById(req.user._id).select({password: 0, __v: 0})
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
    console.log(user)

    console.log(req.body.name)

    user = await User.findOne({name: req.body.name})
    console.log(user)
    if (user)
        return res.status(400).send('bu ism band')

    user = new User(_.pick(req.body, ['email', 'password', 'name']))
    const salt = await bcrypt.genSalt()
    user.password = await bcrypt.hash(user.password, salt)

    await user.save()
    res.send(_.pick(user, ['_id', 'email', 'name']))
})

//logout
router.get('/logout', auth, (req, res) => {
    res.header("x-auth-token", '', {maxAge: 1}).send(true)
    res.redirect('/')
})
module.exports = router