// For '/' endpoint
const getCategories = (req, res, next) => {
    // query parameter
    // check if array is empty or not, length
    if (Object.keys(req.query).length) {
        const category = req.query.categoryName
        console.log(`Searching for category: ${category}`);
    }

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: 'show me all categories '})
}
const postCategory = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: `Create new category: ${req.body.categoryName} and this is for gender: ${req.body.gender}`}) 
}

const deleteCategories = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json ({ success: true, msg: 'delete all categories! '})
}

// For '/:categoryId' endpoint

const getCategory = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: `show me one category with id : ${req.params.categoryId}`})
}

const updateCategory = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: `update category with id: ${req.params.categoryId}`})
}

const deleteCategory = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: `delete category with id: ${req.params.categoryId}`})
}

module.exports = {
    getCategories,
    postCategory,
    deleteCategories,
    getCategory,
    updateCategory,
    deleteCategory

}