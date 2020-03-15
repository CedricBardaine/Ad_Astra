module.exports = {
    insert_Artist_Need: (req, res) => {
        // let id = req.body.id; 
        let id_artist = req.body.id_artist; 
        let id_need = req.body.id_need; 
        // let xblock = req.body.xblock; // DEFAULT : FALSE

        let query = "INSERT INTO `Artist_Need` (id_artist, id_need) VALUES ('" +
        id_artist +"', '"+ id_need + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },

    delete_Artist_Need: (req, res) => {
        let lid = req.body.id;

        let query = "DELETE FROM `Artist_Need` WHERE id= ('" +
        lid + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },
};