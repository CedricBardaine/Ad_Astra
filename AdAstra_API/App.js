const express = require('express');
// const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');

const jwt = require('jsonwebtoken') ; 

const app = express();


// pages routes to test forms from browser
const {getHomePage} = require('./actions/index');
const {addSomethingPage} = require('./actions/routes');

// Table : testtmp
const {addSomething} = require('./actions/Testtmp'); 
// Table : Random_sentence
const {insert_RandomSentence, getRandom_RandomSentence, delete_RandomSentence} = require('./actions/Random_sentence');
// Table : Artist
const {insert_Artist , delete_Artist, get_Artist_infos} = require('./actions/Artist') ; 
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
// Table : Formation
const {insert_Formation , delete_Formation} = require('./actions/Formation') ; 
// Table : UserStar_Musical_style
const {insert_UserStar_Musical_style , delete_UserStar_Musical_style} = require('./actions/UserStar_Musical_style') ; 
// Table : UserStar
const {insert_UserStar , getMdp_UserStar , delete_UserStar} = require('./actions/UserStar') ; 
// Table : Music
const {insert_Music , delete_Music} = require('./actions/Music') ; 
// Table : Picture
const {insert_Picture ,  insert_Picture2,/* insert_Picture3, */ insert_Picture4} = require('./actions/Picture') ; 
// Table : Video
const {insert_Video} = require('./actions/Video') ; 
// Table : Audio
const {insert_Audio} = require('./actions/Audio') ; 
// Table : Publication
const {insert_Publication, get_10_last_Publications} = require('./actions/Publication') ; 
// Table : Reply
const {insert_Reply, delete_Reply} = require('./actions/Reply') ; 
// Table : Following
const {insert_Following, delete_Following} = require('./actions/Following') ; 
// Table : Liking
const {insert_Liking, delete_Liking} = require('./actions/Liking') ; 
// connection
const {login, verifyLogged, getLoggedUserId} = require('./Actions/login'); 

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
//////////////// default //////////////
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json()); // parse form data client
// // app.use(fileUpload()); // configure fileupload
//////////////// default //////////////
//////////////// for Formidable lib ////////////// To process multipart data seperatly
app.use(bodyParser.json())
   .use(bodyParser.urlencoded({extended: true}));
//////////////// for Formidable lib //////////////


// for cross origin to enable request from localhost 
// FIXME: get rid of it before prod 
app.use(cors());


// routes for the app

app.get('/', getHomePage);
app.get('/add', addSomethingPage);

app.post('/add', addSomething);

app.post('/insert_RandomSentence', insert_RandomSentence);
app.post('/delete_RandomSentence', delete_RandomSentence);
app.get('/getRandom_RandomSentence', getRandom_RandomSentence);

app.post('/insert_artist', insert_Artist); 
app.post('/delete_Artist', delete_Artist); 
app.get('/get_infos_Artist', get_Artist_infos); 

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

app.post('/insert_Formation', insert_Formation); 
app.post('/delete_Formation', delete_Formation); 

app.post('/insert_UserStar_Musical_style', insert_UserStar_Musical_style); 
app.post('/delete_UserStar_Musical_style', delete_UserStar_Musical_style); 

app.post('/insert_UserStar', insert_UserStar); 
app.post('/delete_UserStar', delete_UserStar); 
app.get('/testGetMdps' , getMdp_UserStar); // FIXME: FM7 delete before prod !!! 

app.post('/insert_Music', insert_Music); 
app.post('/delete_Music', delete_Music); 

app.post('/insert_Picture', insert_Picture);
app.post('/insert_Picture2', insert_Picture2);
// app.post('/insert_Picture3', insert_Picture3);
app.post('/insert_Picture4', insert_Picture4);
app.post('/insert_Video', insert_Video);
app.post('/insert_Audio', insert_Audio);

app.post('/insert_Publication', insert_Publication); //TODO: secure with verifyToken
app.get('/get_10_pubblications', get_10_last_Publications); 

app.post('/insert_Reply', insert_Reply);
app.post('/delete_Reply', delete_Reply);

app.get('/insert_Following', insert_Following);
app.delete('/delete_Following', delete_Following);

app.get('/insert_Liking', insert_Liking);
app.delete('/delete_Liking', delete_Liking);

app.post('/login' , login); 
function verifyToken(req, res, next) {
    console.log("----- req.headers.authorization")
    console.log(req.headers.authorization);
    console.log("-----")
    if (!req.headers.authorization) {
        console.log("no header");
        return res.status(401).send('Unauthorized request - no header');
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        console.log("no tok");
        return res.status(401).send('Unauthorized request - no token');
    }
    let payload ; 
    try {
        payload = jwt.verify(token, 'secret_etoile');
    } catch (JsonWebTokenError) {
        console.log("bad algorythme : "+ JsonWebTokenError);
        return res.status(401).send('Unauthorized request - error token');
    }
    if (!payload) {
        console.log("bad tok");
        return res.status(401).send('Unauthorized request - bad token');
    }
    console.log("token ok");
    req.userId = payload.subject ;
    // TODO: verify if User exists 
    next();
}
app.post('/verifyLogged', verifyToken, verifyLogged);
app.get('/getLoggedUserId', verifyToken, getLoggedUserId);

// app.get('/edit/:id', editPlayerPage);
// app.post('/edit/:id', editPlayer);

// app.get('/delete/:id', deletePlayer);


app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});

