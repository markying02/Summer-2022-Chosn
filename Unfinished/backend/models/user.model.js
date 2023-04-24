const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true },
    goal1: {type: String, required: true },
    goal2: {type: String, required: true},
    goal3: {type: String, required: true},
}, {
    timestamps: true,

    });


const User = mongoose.model('User', userSchema);

module.exports = User;