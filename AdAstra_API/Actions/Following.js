module.exports = {
    insert_Following: (req, res) => {
        let id_following = req.query.id_following ; 
        let id_followed = req.query.id_followed ; 

        let query = "INSERT INTO `UserStar_Following_UserStar` (id_userStar_following , id_userStar_followed) VALUES ('" +
        id_following +"', '"+ id_followed +"')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },

    delete_Following: (req, res) => {
        let id_following = req.query.id_following ; 
        let id_followed = req.query.id_followed ; 

        let query = "DELETE FROM `UserStar_Following_UserStar` " +
        "WHERE id_userStar_following= ('" + id_following + "')" +
        "AND id_userStar_followed= ("+id_followed+") "
        ;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },
};