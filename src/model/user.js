const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        perm:
        {
            type: Number,
            required: true
        },

        name:
        {
            type: String,
            required: true,
            min: 1,
            max: 255
        },

        username: 
        {
            type: String,
            required: true,
            unique: true,
            min: 6,
            max: 15
        },
        
        password:
        {
            type: String,
            require: true,
            min: 6,
            max: 2048
        }
    }
);

module.exports = mongoose.model('User', userSchema);