// For '/' endpoint
const getItems = (req, res, next) => {

    if(Object.keys(req.query).length){
        //query parameter

        const {
            gender,
            price,
            isClearance,
            category,
            colors,
            sizes
        } = req.query

        const filter = []

        if(gender) filter.push(gender);
        if(price) filter.push(price);
        if(isClearance) filter.push(isClearance);
        if(category) filter.push(category);
        if(colors) filter.push(colors);
        if(sizes) filter.push(sizes);

        for (let i = 0; i < filter.length; i++){
            console.log(`Searching item(s) by: ${filter[i]}`)
        }
    }

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: 'show me all items '})
}

const postItem = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json({ 
        success: true, 
        msg: `create one item with the following fields:
        Item name: ${req.body.itemName}
        Item Description: ${req.body.itemDescription}
        Gender: ${req.body.gender}
        Price: ${req.body.price}
        isClearance: ${req.body.isClearance}
        Category: ${req.body.category}
        colors: ${req.body.colors}
        size: ${req.body.sizes}
    `
    })
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