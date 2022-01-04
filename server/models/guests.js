const mongoose = require("mongoose")

const GuestsSchema = new mongoose.Schema(
    {
        hostId:{type:mongoose.Schema.Types.ObjectId},
        guest:{type:mongoose.Schema.Types.ObjectId,ref:'user'},
        wasSeen:{type:Boolean,default:false}
    }, { timestamps: true }
)

module.exports = mongoose.model("Guests", GuestsSchema)