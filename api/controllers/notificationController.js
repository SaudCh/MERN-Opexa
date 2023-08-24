const notificationSchema = require('../models/notificationSchema');
const HttpError = require('../middleware/httpError');
const deviceSchema = require('../models/deviceSchema');

const getNotification = async (req, res, next) => {

    const { uid } = req.params

    let notification

    try {
        notification = await notificationSchema.find({
            users: { $in: [uid] }
        }).sort({ createdAt: -1 })
    }
    catch (err) {
        const error = new HttpError(err.message, 500);
        return next(error);
    }

    res.status(200).json({ message: "Notification Fetched", notification })

}

const sendNotification = async (uids, notification) => {
    const newNotification = new notificationSchema({
        users: uids,
        title: notification.title,
        body: notification.body
    })

    try {

        await newNotification.save()

        const devices = await deviceSchema.find({
            user: { $in: uids }
        })

        // const tokens = devices.map(device => device.deviceToken)

        // const payload = {
        //     notification: {
        //         title: notification.title,
        //         body: notification.body,
        //         sound: "default"
        //     },
        //     data: {
        //         click_action: "FLUTTER_NOTIFICATION_CLICK",
        //         message: notification.body
        //     }
        // }

    } catch (err) {
        console.log(err)
    }
}




module.exports = {
    sendNotification,
    getNotification,
}