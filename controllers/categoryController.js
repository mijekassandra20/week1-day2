const Category = require('../models/Category');

// For '/' endpoint
const getCategories = async (req, res, next) => {
    // query parameter
    
    const filter = {};
    const options = {}; 

    if (Object.keys(req.query).length) {
        const {
            categoryName,
            gender,
            sortByCategory,
            limit
        } = req.query;

        // filter
        if(categoryName) filter.categoryName = true;
        if(gender) filter.gender = true;

        // options
        if (limit) options.limit  = limit;
        if (sortByCategory) options.sort = {
            category: sortByCategory === 'asc'? 1 : -1
        }  
    }

    try {
        const categories = await Category.find({}, filter, options);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(categories)
    } catch (err) {
        throw new Error(`Error retrieving categories: ${err.message}`);
    }
}

const postCategory = async (req, res, next) => {
    try {
        const category = await Category.create(req.body);

        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(category)

    } catch (err) {
        throw new Error(`Error creating a new category: ${err.message}`);
    }
}

const deleteCategories = async (req, res, next) => {

    try {
        await Category.deleteMany();

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json ({ success: true, msg: 'delete all categories! '})

    } catch(err) {
        throw new Error(`Error deleting all categories: ${err.message}`)
    }
    
}

// For '/:categoryId' endpoint

const getCategory = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.categoryId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(category)

    } catch (err) {
        throw new Error(`Error getting category id of ${req.params.categoryId}: ${err.message}`)
    }

}

const updateCategory = async (req, res, next) => {
    try {
        const category = await Category.findByIdAndUpdate(req.params.categoryId, {
            $set: req.body
        }, { new: true});

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(category);
    } catch (err){
        throw new Error(`Error updating category id of ${req.params.categoryId}: ${err.message}`)
    }
}


const deleteCategory = async (req, res, next) => {

    try {
        await Category.findByIdAndDelete(req.params.categoryId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: `delete category with id: ${req.params.categoryId}`})

    } catch (err){
        throw new Error (`Error deleting category id of ${req.params.categoryId}: ${err.message}`)
    }
}

module.exports = {
    getCategories,
    postCategory,
    deleteCategories,
    getCategory,
    updateCategory,
    deleteCategory

}