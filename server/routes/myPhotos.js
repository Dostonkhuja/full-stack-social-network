const {ownerPhoto} = require("../middleware/uploadImage");
const auth = require("../middleware/auth");
const {User} = require("../models/users");
const {MyPhotos} = require("../models/myPhotos");
const mongoose = require("mongoose");
const router = require('express').Router()

//add new Photo
router.post('/', ownerPhoto.single('myPhoto'), auth, async (req, res) => {
    if (req.file) {
        const user = await User.findById(req.user._id,'myPhotos')

        if (!user)
            return res.status(404).send('mavjud bo\'lmagan foydalanuvchi')

        const newMyPhoto = await MyPhotos({user:req.user._id, photo:req.file.url})
        await newMyPhoto.save()

        user.myPhotos.push(newMyPhoto._id)
        user.myPhotosCount = user.myPhotos.length
        await user.save()

        res.status(200).send(newMyPhoto)
    }
})

//get photos
router.get('/:id',async (req, res) => {
    const pageSize = req.query.pageSize
    const pageNumber = req.query.pageNumber

    const isValidId = mongoose.Types.ObjectId.isValid(req.params.id)
    if (!isValidId)
        return res.status(400).send('ID tasdiqlangan standart objectId emas')

    const myPhotos = await User.findById(req.params.id,'myPhotos myPhotosCount')
        .populate({path:'myPhotos',options:{skip:(pageNumber - 1 ) * pageSize,limit:pageSize,sort: {date:-1}},select:{__v: 0}})

    res.send(myPhotos)
})

module.exports = router