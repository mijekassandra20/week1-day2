const express = require('express');
const router = express.Router();
const {
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    updateUser,
    deleteUser

} = require('../controllers/userController');
const reqLogger = require('../middlewares/reqLogger');

const {
    userValidator

}= require('../middlewares/utils/validator');


//root
router.route('/')
    .get(reqLogger, getUsers)
    .post(reqLogger, userValidator, postUser)
    .delete(reqLogger, deleteUsers)

//categoryId
router.route('/:userId')
    .get(reqLogger, getUser)
    .put(reqLogger, updateUser)
    .delete(reqLogger, deleteUser)

module.exports = router;