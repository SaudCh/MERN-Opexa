const deviceSchema = require("../models/deviceSchema")
const HttpError = require("../middleware/httpError")

const registerDevice = async (req, res, next) => {
    const { deviceToken, uid } = req.body

    let device

    try {

        const exits = await deviceSchema.findOne({
            deviceToken,
            user: uid
        })

        if (exits) {
            // const error = new HttpError("Device Already Registered", 500);
            // return next(error);
            res.status(200).json({ message: "Device Already Registered", device: exits })
            return
        }

        const newDevice = new deviceSchema({
            deviceToken,
            user: uid
        })

        device = await newDevice.save()

    } catch (err) {
        const error = new HttpError(err.message, 500);
        return next(error);
    }

    res.status(200).json({ message: "Device Registered", device })
}

const getDevices = async (req, res, next) => {
    const { uid } = req.query

    let device

    try {
        device = await deviceSchema.find({
            user: uid
        })
    } catch (err) {
        const error = new HttpError(err.message, 500);
        return next(error);
    }

    res.status(200).json({ message: "Device Fetched", device })
}

const deleteDevice = async (req, res, next) => {
    const { id } = req.params

    try {
        await deviceSchema.findByIdAndDelete(id)

    } catch (err) {
        const error = new HttpError(err.message, 500);
        return next(error);
    }

    res.status(200).json({ message: "Device Deleted" })
}

module.exports = {
    registerDevice,
    getDevices,
    deleteDevice
}