const {
    createIntent,
    stripeHook
} = require('../controllers/transcationController')

const router = require('express').Router()

const checkAuth = require('../middleware/checkAuth')

router.post('/stripe-hook', stripeHook)

router.use(checkAuth)

router.post('/create-intent', createIntent)

module.exports = router