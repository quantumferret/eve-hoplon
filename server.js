const express = require('express');
const path = require('path');
require('dotenv').config();
const mongoose = require('mongoose');
const {json} = require('body-parser');
require('./bot.js');
global.fetch = require('node-fetch');
const app = express();

mongoose.connect(`${process.env.DB_URL}/eveauthdb`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', err => console.error(`Database connection error: ${err}`));

db.once('open', () => console.log('Connected to MongoDB'));

const port = process.env.PORT;


app.use(json());

app.use('/api/eve', require('./api/eve'));

app.get('/', (req, res) => {
    // res.status(200).sendFile(path.join(__dirname, 'index.html'));
    res.redirect('/api/eve/login');
});


app.listen(port, 'localhost', () => console.log(`Running at http://localhost:${port}/`));