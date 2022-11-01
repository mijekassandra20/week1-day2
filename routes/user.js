const express = require('express');
const router = express.Router();
const {
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    updateUser,
    deleteUser,
    login,
    forgotPassword,
    resetPassword,
    updatePassword,
    logout

} = require('../controllers/userController');

const protectedRoute = require('../middlewares/auth');
const reqLogger = require('../middlewares/reqLogger');

const {
    userValidator,
    adminValidator

}= require('../middlewares/utils/validator');

//root
router.route('/')
    .get(reqLogger, protectedRoute, adminValidator, getUsers)
    .post(reqLogger, userValidator, postUser)
    .delete(reqLogger, protectedRoute, deleteUsers)

//login router
router.route('/login')
    .post(reqLogger, login)

router.route('/forgotpassword')
    .post(reqLogger, forgotPassword)

router.route('/resetpassword')
    .put(reqLogger, resetPassword)

router.route('/updatepassword')
    .put(reqLogger, protectedRoute, updatePassword)

router.route('/logout')
    .get(reqLogger, protectedRoute, logout)

//categoryId
router.route('/:userId')
    .get(reqLogger, getUser)
    .put(reqLogger, protectedRoute, updateUser)
    .delete(reqLogger, protectedRoute, deleteUser)

module.exports = router;