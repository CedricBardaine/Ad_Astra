module.exports = {
    insert_UserStar_Musical_style: (req, res) => {
        // let id = req.body.id; 
        let id_userStar = req.body.id_userStar; 
        let id_Musical_style = req.body.id_Musical_style; 
        // let xblock = req.body.xblock; // DEFAULT : FALSE

        let query = "INSERT INTO `UserStar_Musical_style` (id_userStar, id_Musical_style) VALUES ('" +
        id_userStar +"', '"+ id_Musical_style + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },

    delete_UserStar_Musical_style: (req, res) => {
        let lid = req.body.id;

        let query = "DELETE FROM `UserStar_Musical_style` WHERE id= ('" +
        lid + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },
};