module.exports = {
    insert_Pro: (req, res) => {
        // let id = req.body.id; 
        let id_userStar = req.body.id_userStar; 
        let company_name = req.body.company_name; 
        let id_contrat = req.body.id_contrat; 
        // let xblock = req.body.xblock; // DEFAULT : FALSE

        let query = "INSERT INTO `Pro` (id_userStar, company_name, id_contrat) VALUES ('" +
        id_userStar +"', '"+ company_name +"', '"+ id_contrat + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },

    delete_Pro: (req, res) => {
        let lid = req.body.id;

        let query = "DELETE FROM `Pro` WHERE id= ('" +
        lid + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },
};