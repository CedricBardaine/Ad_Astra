module.exports = {
    insert_Music: (req, res) => {
        // let id = req.body.id; 
        let name = req.body.name; 
        let contenu = req.body.contenu; 
        let publication_date = req.body.publication_date; 
        let id_userStar = req.body.id_userStar; 
        let id_musical_style = req.body.id_musical_style; 
        // let xblock = req.body.xblock; // DEFAULT : FALSE

        let query = "INSERT INTO `Music` (name, contenu, publication_date, id_userStar, id_musical_style) VALUES ('" +
        name +"', '"+ contenu +"', '"+ publication_date +"', '"+ id_userStar +"', '"+ id_musical_style +"')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },

    delete_Music: (req, res) => {
        let lid = req.body.id;

        let query = "DELETE FROM `Music` WHERE id= ('" +
        lid + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },
};