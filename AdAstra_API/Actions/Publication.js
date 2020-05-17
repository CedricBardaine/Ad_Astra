const paths = require('../utils');

module.exports = {

    insert_Publication: (req, res) => {
        // let id = req.body.id; 
        let kind = req.body.kind; 
        let content = req.body.content; 
        // let nbLikes = req.body.nbLikes; 
        let id_userStar = req.body.id_userStar; 
        let id_media = req.body.id_media; 
        // let xblock = req.body.xblock; // DEFAULT : FALSE

        let query = "";

        if( kind == "PICTURE" )
            query = "INSERT INTO `Publication` (kind, content, id_userStar, id_picture) VALUES ('" + kind +"', '"+ content +"', '"+ id_userStar +"', '"+ id_media + "')";
        else if ( kind == "VIDEO" ) 
            query = "INSERT INTO `Publication` (kind, content, id_userStar, id_video) VALUES ('" + kind +"', '"+ content +"', '"+ id_userStar +"', '"+ id_media + "')";
        else if ( kind == "AUDIO" )
            query = "INSERT INTO `Publication` (kind, content, id_userStar, id_audio) VALUES ('" + kind +"', '"+ content +"', '"+ id_userStar +"', '"+ id_media + "')";
        else 
            return res.status(400).send("error, bad specification for media : "+kind); 
        
        db.query(query, (err, result) => {
            if (err) 
                return res.status(500).send(err); 
            else 
                res.send(result) ; 
        });
        
    },
    
    };