module.exports = {
    insert_Category: (req, res) => {
        // let id = req.body.id; 
        let name = req.body.name; 
        // let xblock = req.body.xblock; // DEFAULT : FALSE

        let query = "INSERT INTO `Category` (name) VALUES ('" +
        name + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },

    delete_Category: (req, res) => {
        let lid = req.body.id;

        let query = "DELETE FROM `Category` WHERE id= ('" +
        lid + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },
};