const User = require('../models/User')

// For '/' endpoint
const getUsers = async (req, res, next) => {
    //query parameter

    const filter = {}; // filters to returns only selected fields eg. userName, gender
    const options = {}; // sorting, pagination , limit 20 data to come back, sorting by asc userName


    if(Object.keys(req.query).length){
        const { 
            userName,
            gender,
            limit, 
            sortByFirstName 
        } = req.query

        if (userName) filter.userName = true
        if (gender) filter.gender = true
        
        if (limit) options.limit  = limit;
        if (sortByFirstName) options.sort = {
            user: sortByFirstName === 'asc'? 1 : -1
        }     
    }

    try {
        const users = await User.find({}, filter, options);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(users)

    } catch (err) {
        throw new Error (`Error retrieving user: ${err.message}`);
    }

}

const postUser = async (req, res, next) => {

    try {
        const user = await User.create(req.body);

        res
        .status(201)
        .setHeader('Content-Type', 'application/json')
        .json(user)

    } catch (err) {
        throw new Error(`Error creating a new user: ${err.message}`)
    }
}

const deleteUsers = async (req, res, next) => {
    try {
        await User.deleteMany();

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json ({ success: true, msg: 'delete all users! '})

    } catch(err) {
        throw new Error(`Error deleting all users: ${err.message}`)
    }
}

// For '/:userId' endpoint

const getUser = async (req, res, next) => {

    try {
        const user = await User.findById(req.params.userId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(user)

    } catch (err) {
        throw new Error(`Error retrieving user with id  ${req.params.userId}: ${err.message}`)
    }

}

const updateUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.userId, {
            $set: req.body
        }, { new: true});

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json(user);

    } catch (err){
        throw new Error(`Error updating user with id ${req.params.userId}: ${err.message}`)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.userId);

        res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({ success: true, msg: `delete user with id: ${req.params.userId}`})

    } catch (err){
        throw new Error (`Error deleting user with id  ${req.params.userId}: ${err.message}`)
    }
}

module.exports = {
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    updateUser,
    deleteUser

}