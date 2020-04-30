module.exports = {
    insert_Artist: (req, res) => {
        // let id = req.body.id; 
        let id_userStar = req.body.id_userStar; 
        let artist_name = req.body.artist_name; 
        let suscribed_until = req.body.suscribed_until; 
        let suscribed = req.body.suscribed; 
        let id_survey = req.body.id_survey; 
        let checked = req.body.checked; 
        // let xblock = req.body.xblock; // DEFAULT : FALSE
        
        let query = "INSERT INTO `Artist` (id_userStar, artist_name, suscribed_until, suscribed, id_survey, checked) VALUES ('" +
        id_userStar +"', '"+ artist_name +"', '"+ suscribed_until +"', "+ suscribed +", '"+ id_survey +"', "+ checked + ")";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },
    
    delete_Artist: (req, res) => {
        let lid = req.body.id;
        
        let query = "DELETE FROM `Artist` WHERE id= ('" +
        lid + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },
    
    get_Artist_infos: (req, res) => {
        let lid = req.query.id ; 

        if (lid != null) {

            let ret = {
                id:null,
                name:null,
                nbFollowers:null,
                nbFollowing:null,
                bio:null,
                idsHeadMusics:null,
                idsHeadPhotos:null
            };
            
            let query = 
            // "SELECT json_object( 'id',artist.id , 'name',artist_name , 'bio',bio ) AS 'data'"+ 
            "SELECT artist.id, artist_name, bio "+ 
            "FROM adastra.artist, adastra.userstar "+
            "WHERE artist.id=userstar.id AND artist.id="+lid+" "+
            "";
            
            db.query(query, (err, result) => {

                if (err) { return res.status(500).send(err); }

                result = JSON.parse( JSON.stringify(result) )[0] ;

                if (result == null ) { 
                    console.error("error ! the Artist might not exists");
                    return res.status(204).send(err); 
                }
                
                console.log(result);

                ret.id = result.id ; 
                ret.name = result.artist_name;
                ret.bio = result.bio;
                
                res.send(ret) ; 
            });
        }
        else res.status(500).send("no id passed");
        }
    };