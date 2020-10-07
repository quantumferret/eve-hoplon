require('dotenv').config();
const esi = require('esijs');

async function displayPublicCharacterInfo(character_id) {
    try {
        let char = await esi.character.info(character_id);
        console.log(char);
    } catch (e) {
        console.log(e);
    }
}