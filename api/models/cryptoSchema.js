const mongoose = require("mongoose")

const schema = mongoose.Schema

const cryptoSchema = schema({
    address: { type: String, required: true },
    image: { type: String, required: true },
    name: { type: String, required: true },
}, {
    timestamps: true
})


module.exports = mongoose.model("crypto", cryptoSchema)