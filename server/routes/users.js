const router = require('express').Router()
const {User} = require('../models/users')

//barcha userlarni uzatish
router.get('/', async (req,res) => {
    const users = await User.find().sort({_id:1}).select({password:0,__v:0})
    res.send(users)
})

//id bo'yicha yuzerni uzatish
router.get('/:id', async (req,res) => {
    const user = await User.findById(req.params.id).select({password:0,__v:0})
    if(!user)
        res.status(404).send('bunday foydalanuvchi mavjud emas')

    res.send(user)
})

module.exports = router