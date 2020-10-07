const mongoose = require('mongoose');

const authObjectSchema = new mongoose.Schema({
    character_id : {
        type: Number,
        required: true
    },
    character_name : {
        type: String,
        required: true
    },
    discord_id : {
        type: Number,
        required: true
    },
    access_token : {
        type: String
    },
    refresh_token : {
        type: String
    },
    expires : {
        type: Number
    }
});


module.exports = mongoose.model('AuthObject', authObjectSchema);
