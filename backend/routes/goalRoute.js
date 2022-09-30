const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authentication');
const { 
    getGoals, 
    setGoals, 
    updateGoals, 
    deleteGoals, 
    getGoalById
} = require('../controllers/goalController');

router.get('/', protect, getGoals);

router.post('/', protect, setGoals);

router.get('/:id', protect, getGoalById);

router.put('/:id', protect, updateGoals);

router.delete('/:id', protect, deleteGoals);

module.exports = router;
