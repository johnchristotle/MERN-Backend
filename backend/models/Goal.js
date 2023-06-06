const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text_title: {
        type: String,
        required: [true, 'Please add a text title']
    },
    text: {
        type: String,
        required: [true, 'Please add some text']
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('Goal', goalSchema)