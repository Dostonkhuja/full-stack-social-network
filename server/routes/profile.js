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
    const ownerId = req.query.ownerId ?req.query.ownerId:''
    let owner = ''

    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id)
    if (!isValidId)
        return res.status(400).send('ID tasdiqlangan standart objectId emas')

    if(ownerId !== '' ){
        owner = await User.findById(ownerId)
    }

    const user = await User.findById(req.params.id)
        .select({password: 0, __v: 0})
        .populate('following followed',{password: 0, __v: 0,isFollow:0})
        .populate({path:'status',populate:{path:'comments', options: {sort: {createdAt:-1},limit: 2}, populate:{path:'user', select:{name:1,photos:1}}},})
        .populate({path:'status',options:{sort: {createdAt:-1},limit:5},populate:{path:'liked', select:{name:1,photos:1,isFollow:1}}})
    user.status = user.status.map(s=>s.liked = s.liked.map(l=>{
        if(owner){
            l.isFollow = owner.following.some(u=>String(u._id) === String(l._id))
            return l.isFollow
        }else{
            return l.isFollow
        }
    }))

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

// new status
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
    user.statusCount = user.status.length
    await user.save()
    statusCount = user.statusCount
    res.status(200).json({newStatus,statusCount})
})

//get status
router.get('/status/:id',async (req, res) => {
    const ownerId = req.query.ownerId
    const pageNumber = req.query.pageNumber
    const statusSize = 5
    let owner = null

    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id)
    if (!isValidId)
        return res.status(400).send('ID tasdiqlangan standart objectId emas')

    if (ownerId !== '')
        owner = await User.findById(ownerId)

    const user = await User.findById(req.params.id)
        .select({password: 0, __v: 0})
        .populate('following followed',{password: 0, __v: 0,isFollow:0})
        .populate({path:'status',populate:{path:'comments', options: {sort: {createdAt:-1},limit: 2}, populate:{path:'user', select:{name:1,photos:1}}},})
        .populate({path:'status', options:{skip:(2 - 1) * statusSize, sort: { createdAt: -1}, limit:statusSize}, populate:{path:'liked', select:{name:1,photos:1,isFollow:1}}})
    user.status = user.status.map(s=>s.liked = s.liked.map(l=> {
        if(owner){
            l.isFollow = owner.following.some(u=>String(u._id) === String(l._id))
            return l.isFollow
        }else{
            return l.isFollow
        }
    }))

    if (!user)
        return res.status(404).send('mavjud bo\'lmagan')

    res.send(user.status)
})

//send comment
router.post('/comment/:statusId', auth, async (req, res) => {
    req.body.user = req.user._id
    let newComment = new Comments(req.body)
    await newComment.save()

    let status = await Status.findById(req.params.statusId)
    status.comments.push(newComment._id)
    status.commentsCount = status.comments.length
    await status.save()
     status = await Status.findById(req.params.statusId).populate({
            path:'comments',
            populate:{path:'user', select:{name:1,photos:1}}
    })

    newComment = status.comments.find(c=>String(c._id) === String(newComment._id))
    res.status(200).json(newComment)
})

//get comment
router.get('/comment/:statusId', async (req, res) => {
    const commentSize = 10
    const count = req.query.count

    const comments = await Status.findById(req.params.statusId).select({comments: 1})
        .populate({
            path: 'comments',
            options:{skip:(count - 1) * commentSize, sort: { createdAt: -1}, limit:10},
            populate: {path: 'user', select: {name: 1,photos: 1}}
        })

    res.status(200).json(comments)
})

//send like
router.get('/liked/:statusId', auth, async (req, res) => {
    let status = await Status.findById(req.params.statusId)
    const isLiked = status.liked.some(l=> String(l) === String(req.user._id))
        if(isLiked){
            const likedAndLikenCountbefore = await Status.findById(req.params.statusId).select({liked:1,likeCount:1}).populate({
                path:'liked', select:{name:1,photos:1}
            })
            return res.status(200).send(likedAndLikenCountbefore)
        }

    status.liked.push(req.user._id)
    status.likeCount = status.liked.length
    await status.save()

    const likedAndLikenCountAfter = await Status.findById(req.params.statusId).select({liked:1,likeCount:1})
        .populate({
        path:'liked', select:{name:1,photos:1}
    })

    res.status(200).json(likedAndLikenCountAfter)
})

//dis like
router.get('/disLiked/:statusId', auth, async (req, res) => {
    let status = await Status.findById(req.params.statusId)
    const isLiked = status.liked.some(l=> String(l) === String(req.user._id))
    if (isLiked) {
        status.liked = status.liked.filter(l=>String(l) !== String(req.user._id))
        status.likeCount = status.liked.length
        await status.save()

        const likedAndLikenCountAfter = await Status.findById(req.params.statusId).select({liked: 1, likeCount: 1})
            .populate({
                path: 'liked', select: {name: 1, photos: 1}
            })

        res.status(200).json(likedAndLikenCountAfter)
    }
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