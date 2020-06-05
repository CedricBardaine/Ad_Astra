const paths = require('../utils');


module.exports = {
    /**
     * Insert a new Publication in the BDD. 
     * The behavior is decided by the req.body.kind. If 'NONE' it inserts only a text Publication with no media. 
     */
    insert_Publication: (req, res) => {
        let TAG_insertPub = "insert_Publication: ";
        console.log(TAG_insertPub, "start");
        console.log(TAG_insertPub, req.body);
        // let id = req.body.id; 
        let kind = req.body.kind; 
        let content = req.body.content; 
        let id_userStar = req.body.id_userStar; 
        let id_media = req.body.id_media; // sent back at the creation of the file with the Formidable lib
        // let xblock = req.body.xblock; // DEFAULT : FALSE
        
        let query = "";
        
        if( kind == "PICTURE" )
        query = "INSERT INTO `Publication` (kind, content, id_userStar, id_picture) VALUES ('" + kind +"', '"+ content +"', '"+ id_userStar +"', '"+ id_media + "')";
        else if ( kind == "VIDEO" ) 
        query = "INSERT INTO `Publication` (kind, content, id_userStar, id_video) VALUES ('" + kind +"', '"+ content +"', '"+ id_userStar +"', '"+ id_media + "')";
        else if ( kind == "AUDIO" )
        query = "INSERT INTO `Publication` (kind, content, id_userStar, id_audio) VALUES ('" + kind +"', '"+ content +"', '"+ id_userStar +"', '"+ id_media + "')";
        else if ( kind == "NONE") 
        query = "INSERT INTO `Publication` (content, id_userStar) VALUES ('" + content +"', '"+ id_userStar + "')";
        else 
        return res.status(400).send("error, bad specification for media : "+kind); 
        
        console.log(TAG_insertPub, "sending query : "+ query);
        
        db.query(query, (err, result) => {
            if (err) 
            return res.status(500).send(err); 
            else 
            res.send(result) ; 
        });
        
    },
    
    /**
     * Returns the 10 last Publications in the DB. 
     * You can cumulate the fetch by incrementing the req.query.start 1 by 1.
     */
    get_10_last_Publications: (req, res) => {
        const TAG_get_10_l_P = "get_10_last_Publications: ";
        console.log(TAG_get_10_l_P+"fetching 10 publications...")
        let start = req.query.start * 10; 
        
        query = "SELECT Publication.id AS id, kind, content, Publication.id_userStar, id_picture, id_video, id_audio, UserStar.photo AS profilPict_userStar, Artist.artist_name AS name_userStar "+
        "FROM Publication, UserStar, Artist "+
        "WHERE UserStar.id = Publication.id_userStar "+
        "AND UserStar.id = Artist.id_userStar "+
        "ORDER BY id DESC "+
        "LIMIT "+start+",10;"
        ;
        db.query(query, (err, result) => {
            if(err) 
            return res.status(500).send(err);
            else {
                // console.log(result);
                res.send(result); 
            }
        });
    }
    
    
    
};