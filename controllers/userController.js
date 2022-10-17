// For '/' endpoint
const getUsers = (req, res, next) => {
    //query parameter
    if(Object.keys(req.query).length){
        const { userName, gender} = req.query

        const filter = [];

        if (userName) filter.push(userName)
        if (gender) filter.push(gender)

        for (let i = 0; i < filter.length; i++){
            console.log(`Search user(s) by: ${filter[i]}`)
        }
    }

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    
    .json({ success: true, msg: 'show me all users! '})
}

const postUser = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json({ 
        success: true, 
        msg: `create one with the following fields:
        User Name: ${req.body.userName}
        First Name: ${req.body.firstName}
        Last Name: ${req.body.lastName}
        Gender: ${req.body.gender}
        Email: ${req.body.email}
        Password: ${req.body.password}
        Phone Number: ${req.body.phoneNumber}
        `
    })
}

const deleteUsers = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json ({ success: true, msg: 'delete all users! '})
}

// For '/:userId' endpoint

const getUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: `show me one user with id : ${req.params.userId}`})
}

const updateUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: `update user with id: ${req.params.userId}`})
}

const deleteUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: `delete user with id: ${req.params.userId}`})
}

module.exports = {
    getUsers,
    postUser,
    deleteUsers,
    getUser,
    updateUser,
    deleteUser

}