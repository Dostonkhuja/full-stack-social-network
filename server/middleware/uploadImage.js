const multer = require('multer')
const cloudinary = require('cloudinary').v2
const cloudinaryStorage = require("cloudinary-multer");

cloudinary.config({
    cloud_name: process.env.cloud_name,
    api_key: process.env.api_key,
    api_secret: process.env.api_secret
})

const storageUserPhoto = new cloudinaryStorage({
    cloudinary: cloudinary,
    uploadOptions: {folder:'social-network', eager: {width: 170, height: 170, crop: "pad"}},
})
const storageCover = new cloudinaryStorage({
    cloudinary: cloudinary,
    uploadOptions: {folder:'social-network-covers'}
})
const storagePhoto = new cloudinaryStorage({
    cloudinary: cloudinary,
    uploadOptions: {folder:'social-network-owner-photos'}
})


module.exports.userPhotos = multer({storage: storageUserPhoto})
module.exports.coverImage = multer({storage: storageCover})
module.exports.ownerPhoto = multer({storage: storagePhoto})
module.exports.statusPhotos = cloudinary.uploader