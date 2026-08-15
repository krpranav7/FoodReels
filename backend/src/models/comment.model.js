const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        rquired: true
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: food,
        required: true
    },
    text: {
        type: String,
        required: true,
        trime: true,
        maxlength: 500
    }
}, {
    timestamps: true
})

const commentModel = mongoose.model('comment', commentSchema);

module.exports = commentModel;