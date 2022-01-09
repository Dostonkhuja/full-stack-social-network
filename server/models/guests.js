const mongoose = require("mongoose")
const Joi = require('joi')

const GuestsSchema = new mongoose.Schema(
    {
        hostId:{type:mongoose.Schema.Types.ObjectId},
        guest:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
        wasSeen:{type:Boolean,default:false}
    }, { timestamps: true }
)

const guestsValidate = Joi.object({
    hostId:mongoose.Schema.Types.ObjectId,
    guest:mongoose.Schema.Types.ObjectId,
    wasSeen: Joi.boolean()
})

module.exports = mongoose.model("Guests", GuestsSchema)
module.exports.guestsValidate = guestsValidate