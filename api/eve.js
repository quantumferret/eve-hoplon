require('dotenv').config();
const express = require('express');
const SsoProvider = require('eve-oauth2-client');

const router = express.Router();

const client_id = process.env.CLIENT_ID;
const client_secret = process.env.SECRET_KEY;
const callback_url = process.env.CALLBACK_URL;

const sso = new SsoProvider(client_id);
const scopes = [ 'publicData'];

let { url, state, clearCode } = sso.getLogin(callback_url, scopes)

console.log(url);
console.log(state);
console.log(clearCode);

router.get('/login', (req, res) => {
    res.redirect(url);
});

router.get( '/oauth-callback/', async ( req, res, next ) => {
    const auth_code = req.query.code;
    console.log(`AUTH CODE: ${auth_code}`);
    console.log(`CLEAR CODE: ${clearCode}`);
    try {
        let current_url = `${req.protocol}://${req.get('host')}${req.originalUrl}`
        console.log(current_url);

        const result = await sso.handleCallback(current_url, state, clearCode);

        for (const [key, value] of Object.entries(result)) {
            console.log(`${key}: ${value}`);
        }
    } catch ( err ) {
        console.log( `ERROR: ${err}` );
    }
});

module.exports = router;


