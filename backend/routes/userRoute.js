const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authentication')
const {
    registerUser,
    loginUser,
    getCurrentUser,
    getAllUsers,
    updateUsers
} = require('../controllers/userController');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/me', protect, getCurrentUser);

router.get('/all', getAllUsers);

router.put('/update/:id', updateUsers);

module.exports = router;