const Goal = require('../models/Goal');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

//@desc - GET Goals
//@route - GET /api/goals
//@access - private

const getGoals = asyncHandler(async(req, res) => {
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json(goals)
});


//@desc - POST Goals
//@route - POST /api/goals
//@access - private

const setGoals = asyncHandler(async(req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
});


//@desc - GET Goal by id
//@route - GET /api/goals/:id
//@access - private

const getGoalById = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }

    res.status(200).json(goal)
})



//@desc - UPDATE Goals
//@route - PUT /api/goals/:id
//@access - private

const updateGoals = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error('Opps! Goal not found')
    }

    //make only a user be able to update his/her goal
    const user = await User.findById(req.user.id)

    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //ensuring the logged-in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedGoal)
});


//@desc - DELETE Goals
//@route - DELETE /api/goals/:id
//@access - private

const deleteGoals = asyncHandler(async(req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal){
        res.status(400)
        throw new Error(`Opps! Goal not found`)
    }

    //make only a user be able to update his/her goal
    const user = await User.findById(req.user.id)

    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    //ensuring the logged-in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove()
    res.status(200).json({message: 'Goal removed successfully!'})
})

module.exports = {
    getGoals,
    setGoals,
    getGoalById,
    updateGoals,
    deleteGoals
}