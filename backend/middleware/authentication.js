const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const protect = asyncHandler(async(req, res, next) => {
    let token;

    if(req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')){

            try{
            
            //get the token from bearer header
            token = req.headers.authorization.split(' ')[1]

            //verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            //then, get the user from the token
            req.user = await User.findById(decoded.id)
            .select('-password')

            next();
        } catch(error){
            res.status(401)
            throw new Error('Not authorized!')
        }

    } if(!token){
        res.status(401)
        throw new Error('Not authorized, no token!!!')
    }
});

module.exports = { protect }