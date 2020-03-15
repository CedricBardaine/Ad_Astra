module.exports = {
    insert_Survey: (req, res) => {
        // let id = req.body.id; 
        let content = req.body.content; 
        // let xblock = req.body.xblock; // DEFAULT : FALSE

        let query = "INSERT INTO `Survey` (content) VALUES ('" +
        content + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },

    delete_Survey: (req, res) => {
        let lid = req.body.id;

        let query = "DELETE FROM `Survey` WHERE id= ('" +
        lid + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },
};