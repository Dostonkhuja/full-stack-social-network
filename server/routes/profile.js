const router = require('express').Router()
const mongoose = require('mongoose')
const auth = require('../middleware/auth')
const {User, contactsValidate, validate} = require('../models/users')
const {Status} = require('../models/status')
const {Comments} = require('../models/comments')
const _ = require('lodash')
const Joi = require("joi")
const {userPhotos,coverImage,statusPhotos} = require('../middleware/uploadImage')

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
        .populate('following followed status',{password: 0, __v: 0,isFollow:0})
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
    if(req.body.photoFile !==null ){
         const uploadResult  = await statusPhotos.upload(req.body.photoFile, {upload_preset:'ml_default',folder: 'social-network-status-images'})
       req.body.photoFile = uploadResult.url
    }
    req.body.userId = req.user._id
    const newStatus = new Status(req.body)
    await newStatus.save()
    const user = await User.findById(req.user._id)
    user.status.push(newStatus._id)
    await user.save()
    res.status(200).json(newStatus)
})

//send comment
router.post('/status/:statusId', auth, async (req, res) => {
    req.body.user = req.user._id
    const newComment = new Comments(req.body)
    await newComment.save()

    const status = await Status.findById(req.params.statusId)
    status.comments.push(newComment._id)
    await status.save()
    res.status(200).json(newComment)
})


//get status by id
// router.get('/status/:id', auth, async (req, res) => {
//     const isValidId = mongoose.Types.ObjectId.isValid(req.params.id)
//     if (!isValidId)
//         return res.status(400).send('ID tasdiqlangan standart objectId emas')
//
//     const user = await User.findById(req.params.id).select({status: 1})
//     if (!user)
//         return res.status(404).send('bunday foydalanuvchi mavjud emas')
//
//     res.send(user.status)
// })

const userProfileValidate = Joi.object({
    name: Joi.string().min(3).max(50),
    fullName: Joi.string().min(3).max(50),
    contacts: contactsValidate
})


module.exports = router