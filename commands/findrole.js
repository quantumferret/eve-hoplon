module.exports = {
    name: 'findrole',
    args: true,
    usage: '<role>',
    description: 'take an argument and return the info for a role matching that argument.',
    execute(message, args) {
        let searched_role = args.join(' ');
        let role_found = message.guild.roles.cache.find(role => role.name === searched_role);

        if ( role_found ) message.channel.send(`${role_found.name}`)
        else message.channel.send('No role found matching that string.');
    }
}