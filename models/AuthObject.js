const mongoose = require( 'mongoose' );

const authObjectSchema = new mongoose.Schema( {
    characterID : {
        type : String,
        required : true,
        unique: true
    },
    characterName : {
        type : String,
        required : true
    },
    characterCorpID: {
        type: String,
        required: true
    },
    discordID : {
        type : String,
        required : true
    },
    accessToken : {
        type : String
    },
    refreshToken : {
        type : String
    },
    expiresIn : {
        type : String
    },
    hasDiscordAuth : {
        type : Boolean,
        default: false
    }
} );


module.exports = mongoose.model( 'AuthObject', authObjectSchema );
