const { getAllUsers,
    getUserById,
    inviteUser,
    acceptInvitation,
    removeInvitation,
    updateStatus,
    getUserByEmail
} = require('../controllers/userController')

const router = require('express').Router()
const checkAuth = require('../middleware/checkAuth')
const { restrictTo } = require('../middleware/restrictRoute')


router.post('/accept-editor', acceptInvitation)

router.use(checkAuth)

router.use(restrictTo('admin', 'editor'))

router.patch('/update-status', updateStatus)
router.get('/users', getAllUsers)
router.get('/user/:id', getUserById)
router.get('/user-by-email/:email', getUserByEmail)

router.post('/invite-editor', inviteUser)
router.delete('/remove-invitation/:id', removeInvitation)



module.exports = router