const mongoose = require("mongoose")

const schema = mongoose.Schema

const subcategorySchema = schema({
    name: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    isDeleted: { type: Boolean, default: false },
    inputs: [{ type: Object }]
}, {
    timestamps: true
})


module.exports = mongoose.model("subcategory", subcategorySchema)