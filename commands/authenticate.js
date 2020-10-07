require('dotenv').config();
const Discord = require('discord.js');

module.exports = {
    name: 'authenticate',
    description: 'Assigns the user the role. If the role requires verification from the Eve SSO, then it verifies that the user is a corporation member by requiring them to log in to the Eve SSO. If successful, then it assigns the proper role and changes their server nickname to their in-game character name.',
    guildOnly: true,
    execute(message, args) {

        // the user will need to click on this link to begin authentication
        const sso_embed = new Discord.MessageEmbed()
            .setTitle('EVE SSO Authentication Service')
            .setDescription('Follow this link to begin the EVE SSO authentication process, which will require you to login to the EVE SSO. Please make sure to select your main character in this corporation when logging in.')
            .setURL(process.env.BASE_URL);

        message.reply(sso_embed);

        // let role = message.guild.roles.cache.find(role => role.name === args.join(' '));
        //
        // message.member.roles.add(role).catch(console.error);
    }
};