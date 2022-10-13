// For '/' endpoint
const getItems = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: 'show me all items '})
}

const postItem = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: 'create new item! '})
}

const deleteItems = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json ({ success: true, msg: 'delete all item! '})
}

// For '/:itemId' endpoint

const getItem = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: `show me one item with id : ${req.params.itemId}`})
}

const updateItem = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: `update item with id: ${req.params.itemId}`})
}

const deleteItem = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: `delete item with id: ${req.params.itemId}`})
}

module.exports = {
    getItems,
    postItem,
    deleteItems,
    getItem,
    updateItem,
    deleteItem

}