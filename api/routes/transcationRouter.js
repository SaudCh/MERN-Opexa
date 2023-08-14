const {
    createIntent,
    stripeHook
} = require('../controllers/transcationController')

const router = require('express').Router()

const checkAuth = require('../middleware/checkAuth')

router.use(checkAuth)

router.post('/create-intent', createIntent)
router.post('/stripe-hook', stripeHook)

module.exports = router