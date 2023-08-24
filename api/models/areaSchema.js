const mongoose = require("mongoose")

const schema = mongoose.Schema

const areaSchema = schema({
    name: { type: String },
    city: { type: String },
    state: { type: String },
    stateCode: { type: String },
}, {
    timestamps: true
})


module.exports = mongoose.model("area", areaSchema)