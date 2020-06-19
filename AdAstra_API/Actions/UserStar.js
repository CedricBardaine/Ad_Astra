
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

        // add salt
        let sel = "etoile";
        password += sel; 

        // FIXME : hash the passphrase like ' UNHEX(SHA2('My secret passphrase',512)) '
        let query = "INSERT INTO `UserStar` (firstname, lastname, birth, mail, password, sign_in_date, photo, name_spotify, name_deezer, name_youtube, name_bandcamp, id_profession, id_country) VALUES ('"+
        firstname+"', '"+lastname+"', '"+birth+"', '"+mail+"', AES_ENCRYPT('"+password+"', 'Astron@ute_1_3_6_13') , '"+sign_in_date+"', '"+photo+"', '"+name_spotify+"', '"+name_deezer+"', '"+name_youtube+"', '"+name_bandcamp+"', '"+id_profession+"', '"+id_country+ "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },

    /**
     * // FIXME: FM7 has to be deleted before prod, dangerous
     * This method is here to test that we can truly get mdp from database
     */
    getMdp_UserStar: (req, res) => {
        let id = req.query.id ; 
        let mail = req.query.mail; 

        let querryForRaw = "SELECT id, password FROM adastra.userstar WHERE id='"+id+"'" ; 
        let querryForDecrypted = "SELECT id, CAST( aes_decrypt(password , 'Astron@ute_1_3_6_13') AS CHAR(50) ) AS pass FROM adastra.userstar WHERE id="+id+"" ; 
        
        
        db.query(querryForRaw, (err, result) => {
            let resFromRawQuerry = "" ; 
            
            if (err)
            resFromRawQuerry = err ; 
            else
                resFromRawQuerry =  JSON.stringify(result) ;
            
            console.log(resFromRawQuerry) ; 
            // res.send( resFromRawQuerry  ) ; 
        });

        db.query(querryForDecrypted, (err, result) => {
            let resFromDecryptedQuerry = "" ; 

            if (err)
                resFromDecryptedQuerry = err ; 
            else
                resFromDecryptedQuerry = JSON.parse( JSON.stringify(result) )[0] ;

                // delete the salt 
                resFromDecryptedQuerry.pass = resFromDecryptedQuerry.pass.slice(-0, -6);  

                console.log(resFromDecryptedQuerry) ; 
                res.send( resFromDecryptedQuerry  ) ; 
        });
    },

    delete_UserStar: (req, res) => {
        let lid = req.body.id;

        let query = "DELETE FROM `UserStar` WHERE id= ('"+lid+ "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },
};