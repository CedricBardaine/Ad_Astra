module.exports = {
    insert_Artist_Talent: (req, res) => {
        // let id = req.body.id; 
        let id_artist = req.body.id_artist; 
        let id_talent = req.body.id_talent; 
        // let xblock = req.body.xblock; // DEFAULT : FALSE

        let query = "INSERT INTO `Artist_Talent` (id_artist, id_talent) VALUES ('" +
        id_artist +"', '"+ id_talent + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },

    delete_Artist_Talent: (req, res) => {
        let lid = req.body.id;

        let query = "DELETE FROM `Artist_Talent` WHERE id= ('" +
        lid + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },
};