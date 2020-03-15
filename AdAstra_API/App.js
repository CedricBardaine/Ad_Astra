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
const {addSomething} = require('./actions/Testtmp'); 

// Table : Random_sentence
const {insert_RandomSentence, getRandom_RandomSentence, delete_RandomSentence} = require('./actions/Random_sentence');

// Table : Artist
const {insert_Artist , delete_Artist} = require('./actions/Artist') ; 

// Table : Contrat
const {insert_Contrat , delete_Contrat} = require('./actions/Contrat') ; 

// Table : Pro
const {insert_Pro , delete_Pro} = require('./actions/Pro') ; 

// Table : Bound
const {insert_Bound , delete_Bound} = require('./actions/Bound') ; 

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

app.post('/insert_Contrat', insert_Contrat); 
app.post('/delete_Contrat', delete_Contrat); 

app.post('/insert_Pro', insert_Pro); 
app.post('/delete_Pro', delete_Pro); 

app.post('/insert_Bound', insert_Bound); 
app.post('/delete_Bound', delete_Bound); 

// app.get('/edit/:id', editPlayerPage);
// app.post('/edit/:id', editPlayer);

// app.get('/delete/:id', deletePlayer);


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});