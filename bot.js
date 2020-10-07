const fs = require('fs');
const Discord = require('discord.js');
const { BOT_TOKEN, prefix } = require('./config.json');
const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on('ready',() => console.log('ready!'));

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if ( command.guildOnly && message.channel.type === 'dm' ) {
        return message.reply('This command only works inside of a server channel.')
    }

    if (command.args && !args.length) {
        return message.channel.send(`You need to provide arguments for this command, ${message.author}.`);
    }

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        return message.reply('there was an error trying to execute that command.');
    }
});

client.login(BOT_TOKEN);