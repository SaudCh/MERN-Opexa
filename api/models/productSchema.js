const mongoose = require("mongoose")

const schema = mongoose.Schema

const productSchema = schema({
    name: { type: String, required: true },
    description: { type: String },
    location: { type: Object, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    inputs: [{ type: Object }],
    images: [{ type: String, }],
    status: { type: String, default: "pending" },
    isDeleted: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'subcategory' },
    furthercategory: { type: mongoose.Schema.Types.ObjectId, ref: 'furthercategory' },
    price: { type: Number, required: true },
}, {
    timestamps: true
})


module.exports = mongoose.model("product", productSchema)