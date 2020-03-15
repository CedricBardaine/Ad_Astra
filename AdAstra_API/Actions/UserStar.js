module.exports = {
    insert_UserStar: (req, res) => {
        // let id = req.body.id; 
        let firstname = req.body.firstname; 
        let lastname = req.body.lastname; 
        let birth = req.body.birth; 
        let mail = req.body.mail; 
        let password = req.body.password; 
        let sign_in_date = req.body.sign_in_date; 
        let photo = req.body.photo; 
        let name_spotify = req.body.name_spotify; 
        let name_deezer = req.body.name_deezer; 
        let name_youtube = req.body.name_youtube; 
        let name_bandcamp = req.body.name_bandcamp; 
        let id_profession = req.body.id_profession; 
        let id_country = req.body.id_country; 
        // let xblock = req.body.xblock; // DEFAULT : FALSE

        let query = "INSERT INTO `UserStar` (firstname, lastname, birth, mail, password, sign_in_date, photo, name_spotify, name_deezer, name_youtube, name_bandcamp, id_profession, id_country) VALUES ('" +
        firstname +"', '"+ lastname +"', '"+ birth +"', '"+ mail +"', '"+ password +"', '"+ sign_in_date +"', '"+ photo +"', '"+ name_spotify +"', '"+ name_deezer +"', '"+ name_youtube +"', '"+ name_bandcamp +"', '"+ id_profession +"', '"+ id_country + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },

    delete_UserStar: (req, res) => {
        let lid = req.body.id;

        let query = "DELETE FROM `UserStar` WHERE id= ('" +
        lid + "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },
};