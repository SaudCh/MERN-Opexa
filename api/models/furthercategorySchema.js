const mongoose = require("mongoose")

const schema = mongoose.Schema

const furthercategorySchema = schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'subcategory' },
    isDeleted: { type: Boolean, default: false },
    inputs: [{ type: Object }]
}, {
    timestamps: true
})


module.exports = mongoose.model("furthercategory", furthercategorySchema)