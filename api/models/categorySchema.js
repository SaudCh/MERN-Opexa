const mongoose = require("mongoose")

const schema = mongoose.Schema

const categorySchema = schema({
    name: { type: String, required: true },
    image: { type: String },
    isDeleted: { type: Boolean, default: false },
    inputs: [{ type: Object }]
}, {
    timestamps: true
})


module.exports = mongoose.model("category", categorySchema)