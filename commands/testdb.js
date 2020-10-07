const AuthObject = require('../models/AuthObject');

module.exports = {
    name: 'testdb',
    args: false,
    description: 'Creates a dummy AuthObject',
    guildOnly: true,
    async execute(message, args) {
        let data = {
            character_id: 2114588871,
            discord_id: message.member.id,
            refresh_token: 'asdf',
            access_token: 'hjkl',
            expires: 3600
        };
        try {
            const authObject = new AuthObject(data);
            await authObject.save();
            await message.channel.send(authObject);
        } catch ( e ) {
            console.log(e);
        }
    }
};