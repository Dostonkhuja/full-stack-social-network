const multer = require('multer')
const cloudinary = require('cloudinary').v2
const cloudinaryStorage = require("cloudinary-multer");

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
})

const storage = new cloudinaryStorage({
    cloudinary: cloudinary,
    uploadOptions: {
        folder:'social-network',
        eager: {width: 170, height: 170, crop: "pad"}
    },
})

module.exports = multer({storage: storage})