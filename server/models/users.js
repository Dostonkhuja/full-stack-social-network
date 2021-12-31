const mongoose = require('mongoose')
const Joi = require('joi')
const PasswordComplexity = require('joi-password-complexity')
const jwt = require('jsonwebtoken')

//User uchun schema tuzamiz
const userSchema = new mongoose.Schema({
    firstName: {type: String, maxlength: 50, default:''},
    lastName: {type: String, maxlength: 50, default: ''},
    city: {type: String, maxlength: 50, default: ''},
    workPlace: {type: String, maxlength: 50, default: ''},
    maritalStatus: {type: String, maxlength: 50, default: ''},
    email: {type: String, minLength: 5, maxLength: 50, unique: true, required: true},
    contacts: {type: Object, "phoneNumber": {type: String, minlength: 5, maxlength: 14},default:null},
    aboutMe: {type: String, maxlength: 100, default: ''},

    password: {type: String, required: true},
    status: [{type: mongoose.Schema.Types.ObjectId, ref: "status",comments:{type:Array,default:[],ref:'comments'},liked:{type:Array,default:[],ref:'user',}}],
    photos: {type: Object, small: {type: String, default: null}, large: {type: String, default: null}, coverImage: {type: String, default: null},default: {small:null,large:null,coverImage:null}},
    myPhotos: [{type: mongoose.Schema.Types.ObjectId, ref: "my-photos"}],
    followed: [{type: mongoose.Schema.Types.ObjectId, ref: "user"}],
    following: [{type: mongoose.Schema.Types.ObjectId, ref: "user"}],
    isFollow: {type:Boolean,default:false},
    isOnline: {type:Boolean,default:false},
    statusCount: {type:Number,default:0},
    followedCount: {type:Number,default:0},
    followingCount: {type:Number,default:0},
    myPhotosCount: {type:Number,default:0}
},{ timestamps: true})

//tokenni generatsiya qilamiz
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id, email: this.email}, process.env.jwtPrivateKey) // {expiresIn: '24h'} - token yaroqlilik muddati
    return token
}

//userni ma'lumotlarini mongodbda saqlash uchun user modelini tuzamiz
const User = mongoose.model('user', userSchema)

//UIdan keladigan ma'lumotlarni validatsiyasini tuzamiz
const contactsValidate = Joi.object({
    phoneNumber: Joi.string().min(5).max(14)
})

const userValidate = Joi.object({
    email: Joi.string().min(3).max(50).required(),
    password: new PasswordComplexity({min: 6, max: 50, lowerCase: 1, upperCase: 1, symbol: 1, requirementCount: 1, numeric: 1}
    ).required(),
    lastName: Joi.string().max(50),
    firstName: Joi.string().max(50),
    // photos: Joi.string(),
    // followed: Joi.array(),
    // contacts: contactsValidate
})

module.exports.User = User
module.exports.validate = userValidate
//Profile uchun export
module.exports.contactsValidate = contactsValidate
