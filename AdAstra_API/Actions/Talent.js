module.exports = {
    insert_Talent: (req, res) => {
        // let id = req.body.id; 
        let name = req.body.name; 
        // let xblock = req.body.xblock; // DEFAULT : FALSE

        let query = "INSERT INTO `Talent` (name) VALUES ('" +
        name + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },

    // FIXME: get the Authorization header & verify it's an admin token ?
    delete_Talent: (req, res) => {
        let lid = req.body.id;

        let query = "DELETE FROM `Talent` WHERE id= ('" +
        lid + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },
};