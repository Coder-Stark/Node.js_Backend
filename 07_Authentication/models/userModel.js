const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    useremail: {
        type: String,
        required: true,
        unique: true
    },
    userpassword: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('multiuser', userSchema);