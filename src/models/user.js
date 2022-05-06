const { Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }, 
    profilePic: {
        type: String,
        default: 'futuro valor de icono'
    }
});

const User = model('User', userSchema);
module.exports = User;