const mongoose = require( 'mongoose' )

const guildSchema = new mongoose.Schema( {
    guildID : {
        type : String,
        required : true,
        unique : true
    },
    guildCorpID : {
        type : String,
        required : true,
        unique : true
    },
    prefix : {
        type : String,
        default : '!',
        maxLength : 2
    },
    rolesToGrant : [ String ]
} )

module.exports = mongoose.model( 'GuildRecord', guildSchema )