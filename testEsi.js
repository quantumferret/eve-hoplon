const esi = require( 'esijs' )
const esiClient = new esi( { logging : false } )

/*
Test updated version of esijs package, as it introduced functionality I needed, but also would have broken
things without some changes made to api/eveauth.js
 */
const response = async char_id => {
    try {
        let { headers, data } = await esiClient.character.affiliation( [ char_id ] )
        console.log( headers )
        console.log( data )
    } catch ( e ) {
        console.error( e )
    }
}

response( 2114588871 )
