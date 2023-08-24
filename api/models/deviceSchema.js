const mongoose = require("mongoose")
// const uniqueValidator = require("mongoose-unique-validator")

const schema = mongoose.Schema

const deviceSchema = schema({
    deviceToken: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
}, {
    timestamps: true
})


module.exports = mongoose.model("device", deviceSchema)