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

const protectedRoute = require('../middlewares/auth')

//root
router.route('/')
    .get(reqLogger, getItems)
    .post(reqLogger, protectedRoute, itemValidator, postItem)
    .delete(reqLogger,protectedRoute, deleteItems)

//itemId
router.route('/:itemId')
    .get(reqLogger, getItem)
    .put(reqLogger, protectedRoute, updateItem)
    .delete(reqLogger, protectedRoute, deleteItem)

router.route('/:itemId/ratings')
    .get(reqLogger, getItemRatings)
    .post(reqLogger, protectedRoute, postItemRating)
    .delete(reqLogger, protectedRoute, deleteItemRatings)

router.route('/:itemId/ratings/:ratingId')
    .get(reqLogger, getItemRating)
    .put(reqLogger, protectedRoute, updateItemRating)
    .delete(reqLogger, protectedRoute, deleteItemRating)

router.route('/:itemId/image')
    .post(reqLogger, protectedRoute, postItemImage)


module.exports = router;