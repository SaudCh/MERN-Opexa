const {
    registerDevice,
    getDevices,
    deleteDevice
} = require("../controllers/deviceController")

const router = require("express").Router()

router.post("/", registerDevice)
router.get("/", getDevices)
router.delete("/:id", deleteDevice)

module.exports = router