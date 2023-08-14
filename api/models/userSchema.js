const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const schema = mongoose.Schema

const userSchema = schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    avatar: { type: String },
    role: { type: String, default: "user" },
    status: { type: String, default: "pending" },
    isDeleted: { type: Boolean, default: false },
    editorRequest: { type: String },
    phoneNumber: { type: String },
    phNumWithCode: { type: String },
    countryCode: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    birthdate: { type: Date },
    completed: { type: Boolean, default: false },
    wishlist: [{ type: schema.Types.ObjectId, ref: "product" }],
}, {
    timestamps: true
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model("user", userSchema)