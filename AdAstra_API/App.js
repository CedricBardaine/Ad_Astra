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
// Table : Talent
const {insert_Talent , delete_Talent} = require('./actions/Talent') ; 
// Table : Need
const {insert_Need , delete_Need} = require('./actions/Need') ; 
// Table : Survey
const {insert_Survey , delete_Survey} = require('./actions/Survey') ; 
// Table : Category
const {insert_Category , delete_Category} = require('./actions/Category') ; 
// Table : Profession
const {insert_Profession , delete_Profession} = require('./actions/Profession') ; 
// Table : Country
const {insert_Country , delete_Country} = require('./actions/Country') ; 
// Table : Artist_Talent
const {insert_Artist_Talent , delete_Artist_Talent} = require('./actions/Artist_Talent') ; 
// Table : Artist_Need
const {insert_Artist_Need , delete_Artist_Need} = require('./actions/Artist_Need') ; 
// Table : Musical_style
const {insert_Musical_style , delete_Musical_style} = require('./actions/Musical_style') ; 

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

app.post('/insert_Talent', insert_Talent); 
app.post('/delete_Talent', delete_Talent); 

app.post('/insert_Need', insert_Need); 
app.post('/delete_Need', delete_Need); 

app.post('/insert_Survey', insert_Survey); 
app.post('/delete_Survey', delete_Survey); 

app.post('/insert_Category', insert_Category); 
app.post('/delete_Category', delete_Category); 

app.post('/insert_Profession', insert_Profession); 
app.post('/delete_Profession', delete_Profession); 

app.post('/insert_Country', insert_Country); 
app.post('/delete_Country', delete_Country); 

app.post('/insert_Artist_Talent', insert_Artist_Talent); 
app.post('/delete_Artist_Talent', delete_Artist_Talent); 

app.post('/insert_Artist_Need', insert_Artist_Need); 
app.post('/delete_Artist_Need', delete_Artist_Need); 

app.post('/insert_Musical_style', insert_Musical_style); 
app.post('/delete_Musical_style', delete_Musical_style); 

// app.get('/edit/:id', editPlayerPage);
// app.post('/edit/:id', editPlayer);

// app.get('/delete/:id', deletePlayer);


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});