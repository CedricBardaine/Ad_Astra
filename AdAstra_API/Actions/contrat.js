module.exports = {
    insert_Contrat: (req, res) => {
        // let id = req.body.id; 
        let start_date = req.body.start_date; 
        let end_date = req.body.end_date; 
        let turnover = req.body.turnover; 
        let size = req.body.size; 
        // let xblock = req.body.xblock; // DEFAULT : FALSE

        let query = "INSERT INTO `Contrat` (start_date, end_date, turnover, size) VALUES ('" +
        start_date +"', '"+ end_date +"', '"+ turnover +"', "+ size + ")";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },

    delete_Contrat: (req, res) => {
        let lid = req.body.id;

        let query = "DELETE FROM `Contrat` WHERE id= ('" +
        lid + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },
};