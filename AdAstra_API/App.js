const express = require('express');
// const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();


// pages routes to test forms from browser
const {getHomePage} = require('./actions/index');
const {addSomethingPage} = require('./actions/routes');

// Table : testtmp
const {addSomething} = require('./actions/testtmp'); 

// Table : Random_sentence
const {insert_RandomSentence, getRandom_RandomSentence, delete_RandomSentence} = require('./actions/random_sentence');

// Table : Artist
const {insert_Artist , delete_Artist} = require('./actions/artist') ; 

const port = 5000;


const db = mysql.createConnection ({
    host: 'localhost',
    user: 'admin',
    password: 'astroadmin1234',
    database: 'adastra'
});


db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database !'); 
});
global.db = db;


// configure middleware
app.set('port', process.env.port || port); 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
// app.use(fileUpload()); // configure fileupload


// routes for the app

app.get('/', getHomePage);
app.get('/add', addSomethingPage);

app.post('/add', addSomething);

app.post('/insert_RandomSentence', insert_RandomSentence);
app.post('/delete_RandomSentence', delete_RandomSentence);
app.get('/getRandom_RandomSentence', getRandom_RandomSentence);

app.post('/insert_artist', insert_Artist); 
app.post('/delete_Artist', delete_Artist); 

// app.get('/edit/:id', editPlayerPage);
// app.post('/edit/:id', editPlayer);

// app.get('/delete/:id', deletePlayer);


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});