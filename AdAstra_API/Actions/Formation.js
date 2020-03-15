module.exports = {
    insert_Formation: (req, res) => {
        // let id = req.body.id; 
        let trainer_name = req.body.trainer_name; 
        let title = req.body.title; 
        let subtitle = req.body.subtitle; 
        let contenu = req.body.contenu; 
        let publication_date = req.body.publication_date; 
        let id_category = req.body.id_category; 
        // let xblock = req.body.xblock; // DEFAULT : FALSE

        let query = "INSERT INTO `Formation` (trainer_name, title, subtitle, contenu, publication_date, id_category) VALUES ('" +
        trainer_name +"', '"+ title +"', '"+ subtitle +"', '"+ contenu +"', '"+ publication_date +"', "+ id_category + ")";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },

    delete_Formation: (req, res) => {
        let lid = req.body.id;

        let query = "DELETE FROM `Formation` WHERE id= ('" +
        lid + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },
};