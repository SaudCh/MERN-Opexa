const mongoose = require("mongoose")

const schema = mongoose.Schema

const categorySchema = schema({
    name: { type: String, required: true },
    image: { type: String },
    isDeleted: { type: Boolean, default: false },
    location: { type: Boolean, default: false },
    inputs: [{ type: Object }],
    subcategories: [{ type: schema.Types.ObjectId, ref: "subcategory" }],
}, {
    timestamps: true
})


module.exports = mongoose.model("category", categorySchema)