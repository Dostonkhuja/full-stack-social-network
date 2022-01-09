const mongoose = require('mongoose')
const Joi = require('joi')

const myPhotosShema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    photo: {type: String, default: ''},
},{ timestamps: true })

const MyPhotos = mongoose.model('my-photos', myPhotosShema)

const myPhotosValidate = Joi.object({
    user:mongoose.Schema.Types.ObjectId,
    photo:Joi.string().default('')
})

module.exports.MyPhotos =  MyPhotos
module.exports.myPhotosValidate =  myPhotosValidate