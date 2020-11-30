const express = require( 'express' )
require( 'dotenv' ).config()
const mongoose = require( 'mongoose' )
const { json } = require( 'body-parser' )
require( './bot.js' )
global.fetch = require( 'node-fetch' )
const app = express()
const everouter = require( './api/eveauth' )


mongoose.connect( `${ process.env.DB_URL }/eveauthdb`, {
    useNewUrlParser : true,
    useCreateIndex : true,
    useUnifiedTopology : true,
    useFindAndModify : false
} )

const db = mongoose.connection

db.on( 'error', err => console.error( `Database connection error: ${ err }` ) )

db.once( 'open', () => console.log( 'Connected to MongoDB' ) )

const port = process.env.PORT


app.use( json() )

app.use( '/api/eve', everouter.router )

app.get( '/', ( req, res ) => {
    res.redirect( '/api/eve/login' )
} )


app.listen( port, 'localhost', () => console.log( `Running at http://localhost:${ port }/` ) )