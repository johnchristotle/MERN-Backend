const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const generateKey = require('../utils/generateKey');


//@desc - Register User
//@route - POST /api/users/register
//@access - public

const registerUser = asyncHandler(async(req, res) => {
    const { name, email, phone, password } = req.body

    if(!name || !email || !phone || !password){
        res.status(400)
        throw new Error('Please add all fields')
    }

    //check if user already exist
    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('User already exist')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    //generate privateKey and publicKey
    const publicKey = "pk_" + generateKey();
    const privateKey = "pv_" + generateKey();

    //create user
    const user = await User.create({
        name,
        email,
        phone,
        password: hashedPassword,
        privateKey,
        publicKey
    })

    if(user){
        res.status(200).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token: generateToken(user._id),
            privateKey: user.privateKey,
            publicKey: user.publicKey
        })
    } else{
        res.status(400)
        throw new Error('Invalid user data')
    }
});


//@desc - Login User
//@route - POST /api/users/login
//@access - public

const loginUser = asyncHandler(async(req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email})

    if(user && (await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            token: generateToken(user._id),
            privateKey: user.privateKey,
            publicKey: user.publicKey
        })
    } else{
        res.status(400)
        throw new Error('Invalid Credentials')
    }
});


//@desc - Get Current User
//@route - GET /api/users/me
//@access - private

const getCurrentUser = asyncHandler(async(req, res) => {
    const { _id, name, email, phone, publicKey, privateKey } = await User.findById(req.user.id)
    res.status(200).json({
        id: _id,
        name,
        email,
        phone,
        publicKey,
        privateKey
    })
})

// Generate Token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:'3m'
    })
}


//@desc - GET All Users
//@route - GET /api/users
//@access - private

const getAllUsers = asyncHandler((async(req, res) => {
    const users = await User.find()
    res.status(200).json(users)
}));

module.exports = {
    registerUser,
    loginUser,
    getCurrentUser,
    getAllUsers
}
