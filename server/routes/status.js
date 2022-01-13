const router = require('express').Router()
const {User} = require('../models/users')
const {Status} = require('../models/status')

//get status
router.get('/',async (req, res) => {
    const ownerId = req.query.ownerId
    const pageNumber = req.query.pageNumber
    const statusSize = 5
    let owner = null

    if (ownerId !== '')
        owner = await User.findById(ownerId)

    let status = await Status.find()
    .skip((pageNumber - 2) * statusSize)
    .sort({createdAt:-1})
    .limit(statusSize)
    .populate({path:'user', select:{lastName:1,firstName:1,photos:1}})        
    .populate({path:'comments', options: {sort: {createdAt:-1},limit: 2}, populate:{path:'user', select:{lastName:1,firstName:1,photos:1}}})
    .populate({path:'liked', select:{lastName:1,firstName:1,photos:1,isFollow:1}})
    
        status.map(s=>s.liked = s.liked.map(l=> {
        if(owner){
            l.isFollow = owner.following.some(u=>String(u._id) === String(l._id))
            return l.isFollow
        }else{
            return l.isFollow
        }
    }))

    res.send(status)
})

module.exports = router