const express = require('express');
const router = express.Router();
const {
    getItems,
    postItem,
    deleteItems,
    getItem,
    updateItem,
    deleteItem,
    getItemRatings,
    postItemRating,
    deleteItemRatings,
    getItemRating,
    updateItemRating,
    deleteItemRating,
    postItemImage

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

router.route('/:itemId/ratings')
    .get(reqLogger, getItemRatings)
    .post(reqLogger, postItemRating)
    .delete(reqLogger, deleteItemRatings)

router.route('/:itemId/ratings/:ratingId')
    .get(reqLogger, getItemRating)
    .put(reqLogger, updateItemRating)
    .delete(reqLogger, deleteItemRating)

router.route('/:itemId/image')
    .post(reqLogger, postItemImage)


module.exports = router;