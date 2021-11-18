const router = require('express').Router()
const auth = require('../middleware/auth')
const {User, contactsValidate, validate} = require('../models/users')
const _ = require('lodash')
const Joi = require("joi")
const {userPhotos,coverImage} = require('../middleware/uploadImage')
const mongoose = require('mongoose')

//update myProfile
router.post('/', auth, async (req, res) => {
    const {error} = userProfileValidate.validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const user = await User.findByIdAndUpdate(req.user._id, _.pick(req.body, ['fullName', 'name', 'contacts']), {new: true})
    if (!user)
        return res.status(404).send('mavjud bo\'lmagan foydalanuvchi')

    res.send(_.pick(user, ['fullName', 'name', 'contacts']))
})

//get profile by id
router.get('/:id',async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id)
    if (!isValidId)
        return res.status(400).send('ID tasdiqlangan standart objectId emas')

    const user = await User.findById(req.params.id).select({password: 0, __v: 0})
    if (!user)
        return res.status(404).send('mavjud bo\'lmagan foydalanuvchi')

    res.send(user)
})

//Update Photo
router.post('/photo', userPhotos.single('avatar'), auth, async (req, res) => {
    if (req.file) {
        const user = await User.findByIdAndUpdate(req.user._id, {
            $set:{'photos.large':req.file.url,'photos.small':req.file.eager[0].url}
        },{new: true})

        if (!user)
            return res.status(404).send('mavjud bo\'lmagan foydalanuvchi')

        res.status(200).send(user.photos)
    }
})

//Update Photo Cover
router.post('/coverImage', coverImage.single('coverImage'), auth, async (req, res) => {
    if (req.file) {

        const user = await User.findByIdAndUpdate(req.user._id, {
            $set:{'photos.coverImage':req.file.url}
        },{new: true})

        if (!user)
            return res.status(404).send('mavjud bo\'lmagan foydalanuvchi')

        res.status(200).send(user.photos.coverImage)
    }
})

//update status
router.post('/status', auth, async (req, res) => {
    const {error} = statusValidate.validate(req.body)
    if (error)
        return res.status(400).send(error.details[0].message)

    const user = await User.findByIdAndUpdate(req.user._id, {status: req.body.status},{new:true})
    if (!user)
        return res.status(404).send('bunday foydalanuvchi mavjud emas')

    res.send(user.status)
})

//get status by id
router.get('/status/:id', auth, async (req, res) => {
    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id)
    if (!isValidId)
        return res.status(400).send('ID tasdiqlangan standart objectId emas')

    const user = await User.findById(req.params.id).select({status: 1})
    if (!user)
        return res.status(404).send('bunday foydalanuvchi mavjud emas')

    res.send(user.status)
})

const userProfileValidate = Joi.object({
    name: Joi.string().min(3).max(50),
    fullName: Joi.string().min(3).max(50),
    contacts: contactsValidate
})
const statusValidate = Joi.object({
    status: Joi.string().min(1).max(1024)
})

module.exports = router