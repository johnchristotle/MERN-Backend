const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authentication')
const {
    registerUser,
    loginUser,
    getCurrentUser,
    getAllUsers
} = require('../controllers/userController');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/me', protect, getCurrentUser);

router.get('/all', getAllUsers);

module.exports = router;