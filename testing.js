const esi = require( 'esijs' )
const Discord = require( 'discord.js' )

const response = async char_id => {
    esi.character.affiliation( [ char_id ] )
       .then( res => console.log( res ) ).catch( console.log )
}

response( 2114588871 )