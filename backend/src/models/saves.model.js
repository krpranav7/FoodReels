const mongoose = require("mongoose");

const savesSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food',
        required: true,
    }
}, {
    timestamps: true
})

const savesModel = mongoose.model('save', savesSchema);
module.exports = savesModel;