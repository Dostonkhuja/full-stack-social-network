const mongoose = require('mongoose')

const commentsShema = new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
    comment: {type: String, default: ''},
    statusId: {type: mongoose.Schema.Types.ObjectId},
},{ timestamps: true })

const Comments = mongoose.model('comments', commentsShema)

module.exports.Comments =  Comments