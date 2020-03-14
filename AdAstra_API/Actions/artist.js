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
};