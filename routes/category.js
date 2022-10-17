const express = require('express');
const router = express.Router();
const { 
    getCategories,
    postCategory,
    deleteCategories,
    getCategory,
    updateCategory,
    deleteCategory 

} = require('../controllers/categoryController');
const reqLogger = require('../middlewares/reqLogger');

const {
    categoryValidator

}= require('../middlewares/utils/validator');


//root
router.route('/')
    .get(reqLogger, getCategories)
    .post(reqLogger, categoryValidator, postCategory)
    .delete(reqLogger, deleteCategories)

//categoryId
router.route('/:categoryId')
    .get(reqLogger, getCategory)
    .put(reqLogger, updateCategory)
    .delete(reqLogger, deleteCategory)

module.exports = router;