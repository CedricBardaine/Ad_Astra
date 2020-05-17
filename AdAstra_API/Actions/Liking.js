module.exports = {
    insert_Liking: (req, res) => {
        let id_liking = req.query.id_liking ; 
        let id_liked = req.query.id_liked ; 

        let query = "INSERT INTO `UserStar_Liked_Publication` (id_userStar , id_publication) VALUES ('" +
        id_liking +"', '"+ id_liked +"')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },

    delete_Liking: (req, res) => {
        let id_liking = req.query.id_liking ; 
        let id_liked = req.query.id_liked ; 

        let query = "DELETE FROM `UserStar_Liked_Publication` " +
        "WHERE id_userStar= ('" + id_liking + "')" +
        "AND id_publication= ("+id_liked+") "
        ;
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },
};