const router = require('express').Router()
const {User} = require('../models/users')
const decoded = require('../middleware/decoded')

//barcha userlarni uzatish
router.get('/', decoded, async (req, res) => {

    const pageSize = req.query.pageSize ? req.query.pageSize : 10
    const pageNumber= req.query.pageNumber ? req.query.pageNumber : 1

    const users = await User
        .find()
        .skip((pageNumber - 1) * pageSize)
        .limit(Number(pageSize))
        .sort({_id: -1})
        .select({password: 0, __v: 0})

    const totalUsersCount = await User.find().countDocuments()

    if (req.user)
        users.forEach(u => u.isFollow = u.followed.includes(req.user._id))

    res.send({users, totalUsersCount})
})

// id bo'yicha yuzerni uzatish
router.get('/:id', async (req,res) => {
    const user = await User.findById(req.params.id).select({password:0,__v:0})
    if(!user)
        res.status(404).send('bunday foydalanuvchi mavjud emas')

    res.send(user)
})

module.exports = router