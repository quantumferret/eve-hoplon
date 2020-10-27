require( 'dotenv' ).config()
const Discord = require( 'discord.js' )
const axios = require( 'axios' ).default
const baseUrl = process.env.BASE_URL

module.exports = {
    args : false,
    name : 'auth',
    description : 'Assigns the user the role. If the role requires verification from the Eve SSO, then it verifies that the user is a corporation member by requiring them to log in to the Eve SSO. If successful, then it assigns the proper role and changes their server nickname to their in-game character name.',
    guildOnly : true,
    async execute( message ) {
        // the user will need to click on this link to begin authentication
        const sso_embed = new Discord.MessageEmbed()
            .setTitle( 'EVE SSO Authentication Service' )
            .setDescription( "Follow this link to login to the EVE SSO. Select your main character in this corporation when logging in. Type `done` in-channel after finishing the login process." )
            .setURL( baseUrl )
        
        // wait for the user who initiated the authentication process to type 'done'.
        try {
            await message.reply( '', sso_embed )
            const didReply = await message.channel.awaitMessages(
                response => ( response.content === 'done' ) && ( response.member.id === message.member.id ),
                {
                    max : 1,
                    time : 300000,
                    errors : [ 'timed out' ]
                } )
            
            if ( didReply ) {
                const response = await axios.get( `${ baseUrl }/api/eve/eveauth-request`, {
                    params : {
                        discordID : message.member.id,
                        guildID : message.guild.id
                    }
                } ).then( res => res.data )
                
                console.log(response)
                
                if ( response.hasDiscordAuth ) {
                    for ( const r of response.rolesToGrant ) {
                        const role = message.guild.roles.cache.find( role => role.name === r )
                        await message.member.roles.add( role )
                        await message.member.setNickname( response.characterName )
                    }
                    message.channel.send( `Op success ${ message.member }` )
                } else {
                    message.channel.send( 'Authentication failed' )
                }
            }
        } catch ( e ) {
            if ( e === 'DiscordAPIError: Missing Permissions' ) {
                console.log( e )
                message.channel.send( 'Nickname failed to change. If you are the server owner, you\'ll have to change it manually.' )
            } else {
                console.log( e )
                message.channel.send( 'Something went wrong.' )
            }
        }
    }
}