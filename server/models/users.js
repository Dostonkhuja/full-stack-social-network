const mongoose = require('mongoose')
const Joi = require('joi')
const PasswordComplexity = require('joi-password-complexity')
const jwt = require('jsonwebtoken')

//User uchun schema tuzamiz
const userSchema = new mongoose.Schema({
    email: {type: String, minLength: 5, maxLength: 50, unique: true, required: true},
    password: {type: String, required: true},
    fullName: {type: String, minlength: 3, maxlength: 50, default: null},
    name: {type: String, minlength: 3, maxlength: 50, default: null},
    status: {type: String, minlength: 1, maxlength: 1024, default: null},
    photos: {type: Object, small: {type: String}, large: {type: String}, default: null},
    followed: [{type:mongoose.Schema.Types.ObjectId,ref:'user'}],
    contacts: {type: Object, "phoneNumber": {type: String, minlength: 5, maxlength: 14}}
})

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
    password: new PasswordComplexity({
            min: 6, max: 50, lowerCase: 1, upperCase: 1, symbol: 1, requirementCount: 1, numeric: 1
        }
    ).required(),
    name: Joi.string().min(3).max(50),
    fullName: Joi.string().min(3).max(50),
    status: Joi.string().min(1).max(1024),
    photos: Joi.string(),
    followed: Joi.array(),
    contacts: contactsValidate
})

module.exports.User = User
module.exports.validate = userValidate
//Profile uchun export
module.exports.contactsValidate = contactsValidate
