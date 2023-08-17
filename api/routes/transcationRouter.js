const {
    createIntent,
    getUserPayments,
    getAllPayments,
    createOffline,
    createCrypto,
    getPayment,
    acceptCrypto,
    rejectCrypto
} = require('../controllers/transcationController')

const router = require('express').Router()

const checkAuth = require('../middleware/checkAuth')
const { restrictTo } = require('../middleware/restrictRoute')

router.use(checkAuth)

router.post('/create-intent', createIntent)
router.get('/user-payments', getUserPayments)
router.post('/create-crypto', createCrypto)

router.use(restrictTo('admin'))
router.get('/all-payments', getAllPayments)
router.post('/create-offline', createOffline)
router.get('/get-payment/:id', getPayment)
router.patch('/accept-crypto', acceptCrypto)
router.patch('/reject-crypto', rejectCrypto)

module.exports = router