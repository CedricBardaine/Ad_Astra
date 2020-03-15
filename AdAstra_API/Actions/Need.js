module.exports = {
    insert_Need: (req, res) => {
        // let id = req.body.id; 
        let name = req.body.name; 
        // let xblock = req.body.xblock; // DEFAULT : FALSE

        let query = "INSERT INTO `Need` (name) VALUES ('" +
        name + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },

    delete_Need: (req, res) => {
        let lid = req.body.id;

        let query = "DELETE FROM `Need` WHERE id= ('" +
        lid + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },
};