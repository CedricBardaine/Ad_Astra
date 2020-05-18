module.exports = {
    insert_Reply: (req, res) => {
        // let id = req.body.id; 
        let content = req.body.content; 
        let id_publication = req.body.id_publication; 
        let id_userStar = req.body.id_userStar; 
        // let xblock = req.body.xblock; // DEFAULT : FALSE

        let query = "INSERT INTO `Reply` (content, id_publication, id_userStar) VALUES ('" +
        content +"', '"+ id_publication +"', '"+ id_userStar + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },

    delete_Reply: (req, res) => {
        let lid = req.body.id;

        let query = "DELETE FROM `Reply` WHERE id= ('" +
        lid + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },
};