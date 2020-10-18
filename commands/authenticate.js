require( 'dotenv' ).config();
const Discord = require( 'discord.js' );
const axios = require( 'axios' ).default;
const AuthObject = require( '../models/AuthObject' );


const baseUrl = process.env.BASE_URL;

module.exports = {
    args : false,
    name : 'authenticate',
    description : 'Assigns the user the role. If the role requires verification from the Eve SSO, then it verifies that the user is a corporation member by requiring them to log in to the Eve SSO. If successful, then it assigns the proper role and changes their server nickname to their in-game character name.',
    guildOnly : true,
    async execute( message ) {
        // the user will need to click on this link to begin authentication
        const sso_embed = new Discord.MessageEmbed()
            .setTitle( 'EVE SSO Authentication Service' )
            .setDescription( "Follow this link to login to the EVE SSO. Select your main character in this corporation when logging in. Type `done` in-channel after finishing the login process." )
            .setURL( baseUrl );
        try {
            const author_id = message.author.id;
            await message.reply( '', sso_embed )
            const didReply = await message.channel.awaitMessages( response => ( response.content === 'done' ) && ( response.author.id === author_id ),
                {
                    max : 1,
                    time : 300000,
                    errors : [ 'timed out' ]
                } )
            
            if ( didReply ) {
                const response = await axios.get( `${ baseUrl }/api/eve/eveauth-request` ).then( res => res.data );
                if ( response.hasDiscordAuth ) {
                    response.discordID = author_id;
                    const authed_user = new AuthObject( response );
                    await authed_user.save().then( () => {
                        return message.channel.send( `Op success ${ message.author }` )
                    } );
                }
            }
        } catch ( e ) {
            console.log( e );
        }
        
        // let role = message.guild.roles.cache.find(role => role.name === args.join(' '));
        //
        // message.member.roles.add(role).catch(console.error);
    }
};