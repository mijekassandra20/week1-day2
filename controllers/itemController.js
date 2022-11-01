const Item = require('../models/Item');
const path = require('path');

// ----------------- For '/' endpoint -----------------
const getItems = async (req, res, next) => {

    const filter = {}; // filters to returns only selected fields 
    const options = {}; // sorting, pagination , limit 20 data to come back
    
    if(Object.keys(req.query).length){
        //query parameter

        const {
            gender,
            price,
            isClearance,
            category,
            colors,
            sizes,
            sortByPrice,
            limit
        } = req.query


        if(gender) filter.gender = true;
        if(price) filter.price = true;
        if(isClearance) filter.isClearance = true;
        if(category) filter.category = true;
        if(colors) filter.colors = true;
        if(sizes) filter.sizes = true;

        if (limit) options.limit  = limit;
        if (sortByPrice) options.sort = {
            price: sortByPrice === 'asc'? 1 : -1
        }     
    }

    try {
        const items = await Item.find();

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(items)

    } catch (err) {
        throw new Error (`Error retrieving items: ${err.message}`);

    }
}

const postItem = async (req, res, next) => {
    try {
        const item = await Item.create(req.body);

        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(item)

    } catch (err) {
        throw new Error(`Error posting new item: ${err.message}`)
    }
}

const deleteItems = async (req, res, next) => {
    try {
        await Item.deleteMany();

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json ({ success: true, msg: 'delete all items! '})

    } catch(err) {
        throw new Error(`Error deleting all items: ${err.message}`)
    }
}

// ----------------- For '/:itemId' endpoint -----------------
const getItem = async (req, res, next) => {

    try {
        const item = await Item.findById(req.params.itemId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(item)

    } catch (err) {
        throw new Error(`Error retrieving item with id  ${req.params.itemId}: ${err.message}`)
    }
}

const updateItem = async (req, res, next) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.itemId, {
            $set: req.body
        }, { new: true});

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(item);

    } catch (err){
        throw new Error(`Error updating item with id ${req.params.itemId}: ${err.message}`)
    }
}

const deleteItem = async (req, res, next) => {
    try {
        await Item.findByIdAndDelete(req.params.itemId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: `delete item with id: ${req.params.itemId}`})

    } catch (err){
        throw new Error (`Error deleting item with id  ${req.params.itemId}: ${err.message}`)
    }
};

// ----------------- For '/:itemId/ratings' endpoint -----------------
const getItemRatings = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.itemId);
        const ratings = item.ratings;

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(ratings)

    } catch(err) {
        throw new Error(`Error retreving all ratings: ${err.message}`);
    }
}

const postItemRating = async (req, res, next) =>{
    try{
        const item = await Item.findById(req.params.itemId);
        item.ratings.push(req.body);

        const result = await item.save();

        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(result)

    } catch (err){
        throw new Error(`Error posting an item rating: ${err.message}`);
    }
}

const deleteItemRatings = async (req, res, next) =>{
    try{
        const item = await Item.findById(req.params.itemId);

        item.ratings = [];

        await item.save();

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: 'All ratings deleted successfully!'})


    } catch (err) {
        throw new Error(`Error deleting all ratings: ${err.message}`)
    }
}


// ----------------- For '/:itemId/ratings/:ratingId' endpoint -----------------

const getItemRating = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.itemId);

        let rating = item.ratings.find(rating => (rating._id).equals(req.params.ratingId))

        if (!rating) rating = { success: false, msg: `No rating found with rating ID: ${req.params.ratingId}`}

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating)

    } catch (err) {
        throw new Error(`No rating found with rating ID: ${req.params.ratingId}`)
    }
}

const updateItemRating = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.itemId);

        let rating = item.ratings.find(rating => (rating._id).equals(req.params.ratingId));

        if (rating) {
            const ratingIndexPosition = item.ratings.indexOf(rating);
            item.ratings.splice(ratingIndexPosition, 1, req.body)
            rating = item.ratings[ratingIndexPosition]
            await item.save();
        } else {
            rating = { success: false, msg: `No rating found with rating id: ${req.params.ratingId}`}
        }

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating);
        
    } catch (err) {
        throw new Error(`Error updating rating with rating ID: ${req.params.ratingId}`)
    }
}

const deleteItemRating = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.itemId);

        let rating = item.ratings.find(rating => (rating._id).equals(req.params.ratingId));

        if (rating) {
            const ratingIndexPosition = item.ratings.indexOf(rating);
            item.ratings.splice(ratingIndexPosition, 1);
            rating = { sucess: true, msg: `Rating with ID: ${req.params.ratingId} deleted!!!`}
            await item.save();
        } else {
            rating = { sucess: false, msg: `No rating found with rating id: ${req.params.ratingId}`}
        }

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(rating)

    } catch (err){
        throw new Error (`Error deleting item rating with rating id  ${req.params.itemId}: ${err.message}`)
    }
}

const postItemImage = async (req, res, next) => {

    // check if req has files property
    if (!req.files) throw new Error('Missing image!');

    // retrieve the actual file
    const file = req.files.file;

    // check if file is actually a image type
    if(!file.mimetype.startsWith('image')) throw new Error('Please upload an image file type!');

    // check if the file size exceeds the limit
    if(file.size > process.env.MAX_FILE_SIZE) throw new Error(`Image exceeds size of ${process.env.MAX_FILE_SIZE}`);
    
    file.name = `photo_${file.name}`
    // file.name = `photo_${path.parse(file.name).ext}`

    const filePath = process.env.FILE_UPLOAD_PATH + file.name

    file.mv(filePath, async (err) => {
        if (err) throw new Error(`Problem uploading photo ${err.message}`);

            await Item.findByIdAndUpdate(req.params.itemId, { image: file.name });

            res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({ success: true, data: file.name });
    })

}

module.exports = {
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
}
