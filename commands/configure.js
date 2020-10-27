const GuildRecord = require( '../models/Guild' )

module.exports = {
    name : "configure",
    description : "Configure the initial settings for your server",
    guildOnly : true,
    async execute( message ) {
        if ( !message.member.hasPermission( 'ADMINISTRATOR' ) ) return message.reply( 'Need admin rights to do this.' )
        
        const filter = response => response.member.id === message.member.id
        const options = { max : 1, time : 300000, errors : [ 'timed out' ] }
        
        const prompts = {
            guildCorpID : "enter your Eve corporation's ID:",
            prefix : "Enter a prefix to use for this bot's commands:",
            rolesToGrant : "Enter role to grant corporation members after they've completed the authentication process, exactly as its shown in the server settings' 'roles' tab:"
        }
        
        const settings = {
            guildID : message.guild.id,
            guildCorpID : '',
            prefix : '!',
            rolesToGrant : ''
        }
        
        try {
            for ( const key in prompts ) {
                message.channel.send( prompts[ key ] )
                const response = await message.channel.awaitMessages( filter, options )
                
                //need first() method because response is a Collection, then the reply's content is accessible
                settings[ key ] = response.first().content
            }
            console.log( settings )
            const record = new GuildRecord( settings )
            
            //create new doc if a server's settings aren't configured already, otherwise update the current settings
            await GuildRecord.findOneAndUpdate(
                { guildID : settings.guildID },
                settings,
                { upsert : true, new : true, runValidators : true },
                ( err, document ) => err ? console.log( err ) : console.log( document )
            )
            message.channel.send( `Corporation ID: ${ settings.guildCorpID }\nCommand prefix: ${ settings.prefix }\nRoles to grant: ${ settings.rolesToGrant }\n` )
        } catch ( e ) {
            console.log( e )
            message.channel.send( '```' + e + '```' )
        }
        
    }
}