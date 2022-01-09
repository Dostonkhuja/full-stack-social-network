const mongoose = require('mongoose')
const Joi = require('joi')
const PasswordComplexity = require('joi-password-complexity')
const jwt = require('jsonwebtoken')

//User uchun schema tuzamiz
const userSchema = new mongoose.Schema({
    firstName: {type: String, maxlength: 50, default:''},
    lastName: {type: String, maxlength: 50, default: ''},
    city: {type: String, maxlength: 20, default: ''},
    workPlace: {type: String, maxlength: 20, default: ''},
    maritalStatus: {type: String, maxlength: 20, default: ''},
    email: {type: String, minLength: 10, maxLength: 50, unique: true, required: true},
    contacts: {type: Object, "phoneNumber": {type: String, minlength: 5, maxlength: 14},default:''},
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
    phoneNumber: Joi.string().min(5).max(20).default('')
})

const statusValidate = Joi.array().items(Joi.object({_id:mongoose.Schema.Types.ObjectId}))

const photosValidate = Joi.object({
    small:Joi.string().default(null),
    large:Joi.string().default(null),
    coverImage:Joi.string().default(null)
}).default({small:null,large:null,coverImage:null})

const userValidate = Joi.object({
    email: Joi.string().min(10).max(50).alter({
        post: (userValidate) => userValidate.required(),
        put: (userValidate) => userValidate.forbidden(),
    }),
    password: new PasswordComplexity(
        {min: 6, max: 50, lowerCase: 1, upperCase: 1, symbol: 1, requirementCount: 1, numeric: 1}
    ).alter({
        post: (userValidate) => userValidate.required(),
        put: (userValidate) => userValidate.forbidden(),
    }),
    lastName: Joi.string().max(16).min(2).alter({
        post: (userValidate) => userValidate.required(),
        put: (userValidate) => userValidate.forbidden(),
    }),
    firstName: Joi.string().max(16).min(2).alter({
        post: (userValidate) => userValidate.required(),
        put: (userValidate) => userValidate.forbidden(),
    }),
    city: Joi.string().max(20).min(2).allow(''),
    workPlace: Joi.string().max(20).min(2).allow(''),
    maritalStatus: Joi.string().max(20).min(2).allow(''),
    aboutMe: Joi.string().max(100).allow(''),
    myPhotos: Joi.array().items(mongoose.Schema.Types.ObjectId),
    followed: Joi.array().items(mongoose.Schema.Types.ObjectId),
    following: Joi.array().items(mongoose.Schema.Types.ObjectId),
    isFollow: Joi.boolean(),
    isOnline: Joi.boolean(),
    statusCount: Joi.number(),
    followedCount: Joi.number(),
    followingCount: Joi.number(),
    myPhotosCount: Joi.number(),
    photos:photosValidate,
    status:statusValidate,
    contacts: contactsValidate
})

module.exports.User = User
module.exports.validate = userValidate

