const express = require('express');
// const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');

const app = express();



const {getHomePage} = require('./index');
// TODO: mieux organiser les routes, genre dans un dossier /routes/...
const {addSomethingPage, addSomething} = require('./actions');

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

// app.get('/edit/:id', editPlayerPage);
// app.post('/edit/:id', editPlayer);

// app.get('/delete/:id', deletePlayer);



app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});