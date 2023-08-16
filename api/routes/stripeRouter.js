const {
    stripeHook
} = require('../controllers/transcationController')

const router = require('express').Router()

router.post('/stripe-hook', stripeHook)

module.exports = router