const mongoose = require("mongoose")

const schema = mongoose.Schema

const swiperSchema = schema({
    title: { type: String },
    date: { type: String },
    location: { type: String },
    image: { type: String },
    formattedDate: { type: Date },
}, {
    timestamps: true
})


module.exports = mongoose.model("swiper", swiperSchema)