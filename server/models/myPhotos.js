const mongoose = require('mongoose')

const myPhotosShema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    photo: {type: String, default: ''},
},{ timestamps: true })

const MyPhotos = mongoose.model('my-photos', myPhotosShema)

module.exports.MyPhotos =  MyPhotos