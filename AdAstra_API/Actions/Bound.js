module.exports = {
    insert_Bound: (req, res) => {
        // let id = req.body.id; 
        let id_pro = req.body.id_pro; 
        let id_artist = req.body.id_artist; 
        let blocked = req.body.blocked; 
        // let xblock = req.body.xblock; // DEFAULT : FALSE

        let query = "INSERT INTO `Bound` (id_pro, id_artist, blocked) VALUES ('" +
        id_pro +"', '"+ id_artist +"', '"+ blocked + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },

    delete_Bound: (req, res) => {
        let lid = req.body.id;

        let query = "DELETE FROM `Bound` WHERE id= ('" +
        lid + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },
};