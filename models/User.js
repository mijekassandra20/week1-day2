const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema ({
    userName: {
        type: String,
        unique: true,
        required: [true, 'Please add a user name!'],
        maxLength: [15, 'Username can not be more than 15 characters']
    },
    firstName: {
        type: String,
        required: [true, 'Please add a first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please add a last name']
    },
    gender: {
        type: String,
        required: [true, 'Please add a gender'],
        enum: [
            'Male',
            'Female'
        ]
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        validate: (email) => {
            return validator.isEmail(email);
        }
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        validate: (password) => {
            return validator.isStrongPassword(password);
        }
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    },
    admin: {
        type: Boolean,
        default: false
    }


}, {
    timestamps: true
})

// bcrypt - pre hook the hashes the password before saving in the database
UserSchema.pre('save', async function(next) {

    // first check if password is not modified
    if (!this.isModified('password')) next(); // login

    // complexity and the length of your string of your hash password
    const salt = await bcrypt.genSalt(10) 
    this.password = await bcrypt.hash(this.password, salt) // resetPassword, create new pass, update pass
})

// retrieve the signed JWT token when user logs in OR creates new account!
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign( 
        {id: this._id}, // token for a specific user id 
        process.env.JWT_SECRET, // to decode 
        {expiresIn: process.env.JWT_EXPIRE} // when it expires
    )
}

// to match password for login
UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// reset the password token
UserSchema.methods.getResetPasswordToken = function() {
    // create a hex token with size of 20
    const resetToken = crypto.randomBytes(20).toString('hex')

    // create hash to increase security for the reset token and tell if that came from hex format
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000 // set expiration for resetting the password for 1 hr

    return resetToken;
}


module.exports = mongoose.model('User', UserSchema);