const mongoose = require("mongoose")

const schema = mongoose.Schema

// title,
//         description,
//         price,
//         images,
//         location,
//         category,
//         subcategory,
//         furthercategory,
//         user,
//         expert

const productSchema = schema({
    title: { type: String, required: true },
    description: { type: String },
    location: { type: Object, required: true },
    city: { type: String, },
    state: { type: String, },
    country: { type: String, },
    inputs: [{ type: Object }],
    images: [{ type: String, }],
    status: { type: String, default: "pending" },
    isDeleted: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'category' },
    subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'subcategory' },
    furthercategory: { type: mongoose.Schema.Types.ObjectId, ref: 'furthercategory' },
    price: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    expert: { type: Boolean, default: false },
}, {
    timestamps: true
})


module.exports = mongoose.model("product", productSchema)