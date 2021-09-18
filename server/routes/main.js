const router = require('express').Router()

router.get('/', async (req,res) => {
    res.send('main page')
})

module.exports = router