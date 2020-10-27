module.exports = {
    name : 'removerole',
    args : true,
    usage : '<role>',
    description : 'Removes a role from the user who issued the command',
    guildOnly : true,
    async execute( message, args ) {
        let role = message.guild.roles.cache.find( role => role.name === args.join( ' ' ) )
        
        message.member.roles.remove( role ).catch( console.error )
    }
}