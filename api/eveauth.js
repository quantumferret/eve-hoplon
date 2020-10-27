require( 'dotenv' ).config()
const express = require( 'express' )
const SsoProvider = require( 'eve-oauth2-client' )
const esi = require( 'esijs' )
const path = require( 'path' )
const AuthObject = require( '../models/AuthObject' )
const GuildRecord = require( '../models/Guild' )

const router = express.Router()
const client_id = process.env.CLIENT_ID
const callback_url = process.env.CALLBACK_URL

const sso = new SsoProvider( client_id )
const scopes = [ 'publicData' ]

const { url, state, clearCode } = sso.getLogin( callback_url, scopes )
let user = {}


router.get( '/login', ( req, res ) => {
    res.redirect( url )
} )


router.get( '/oauth-callback/', async ( req, res ) => {
    try {
        const currentUrl = `${ req.protocol }://${ req.get( 'host' ) }${ req.originalUrl }`
        const { characterID, characterName, accessToken, refreshToken, expiresIn } = await sso.handleCallback( currentUrl, state, clearCode )
        const [ { corporation_id } ] = await esi.character.affiliation( [ Number( characterID ) ] )
        
        user = {
            characterID : characterID,
            characterName : characterName,
            characterCorpID : String( corporation_id ),
            discordID : '',
            accessToken : accessToken,
            refreshToken : refreshToken,
            expiresIn : expiresIn,
            hasDiscordAuth : false
        }
        
        res.sendFile( path.join( __dirname, '../success.html' ) )
    } catch ( err ) {
        res.sendFile( path.join( __dirname, '../auth-fail.html' ) )
        console.log( `ERROR: ${ err }` )
    }
} )


router.get( '/eveauth-request', async ( req, res ) => {
    try {
        user.discordID = req.query.discordID
        const { guildCorpID, rolesToGrant } = await GuildRecord.findOne( {
            guildID : req.query.guildID
        }, {
            prefix : 0,
            __v : 0,
            guildID : 0
        } ).lean()
        if ( user.characterCorpID === guildCorpID ) {
            user.hasDiscordAuth = true
            const authed_user = new AuthObject( user )
            await authed_user.save()
        }
        res.json( {
            hasDiscordAuth : user.hasDiscordAuth,
            characterName : user.characterName,
            rolesToGrant : rolesToGrant
        } )
    } catch ( e ) {
        console.log( e )
    }
} )


exports.router = router