const {
    signup,
    login,
    adminLogin,
    forgotPassword,
    resetPassword,
    getbasicProfile,
    updateProfile
} = require('../controllers/authController')

const router = require('express').Router()
const checkAuth = require('../middleware/checkAuth')


router.post('/signup', signup)

router.post('/login', login)
router.post('/admin-login', adminLogin)

router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)

router.use(checkAuth)
router.get('/get-basic-profile', getbasicProfile)
router.patch('/update-profile', updateProfile)


module.exports = router