const express = require('express');
const router = express.Router();
const {
    getItems,
    postItem,
    deleteItems,
    getItem,
    updateItem,
    deleteItem

} = require('../controllers/itemController')

const reqLogger = require('../middlewares/reqLogger');

const {
    itemValidator

}= require('../middlewares/utils/validator');

//root
router.route('/')
    .get(reqLogger, getItems)
    .post(reqLogger, itemValidator, postItem)
    .delete(reqLogger, deleteItems)

//itemId
router.route('/:itemId')
    .get(reqLogger, getItem)
    .put(reqLogger, updateItem)
    .delete(reqLogger, deleteItem)

module.exports = router;