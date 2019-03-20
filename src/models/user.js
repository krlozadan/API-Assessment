const mongoose = require("mongoose");

// User Schema configuration
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true, 
        match: /^[a-zA-Z ]{1,50}$/
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        match: /^[a-zA-Z ]{1,50}$/ 
    },
    ip_address : {
        type: String,
        required : true,
        trim : true,
        match : /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/
    }
}, { collection : 'users' });

module.exports = mongoose.model('User', userSchema);