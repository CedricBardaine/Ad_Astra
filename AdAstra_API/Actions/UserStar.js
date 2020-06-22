
const fs = require('fs');
const key_str = fs.readFileSync('./pass.txt', 'utf8') ; 

const fileLabel = "UserStar.js : ";

module.exports = {
    insert_UserStar: (req, res) => {
        const fctLabel = fileLabel+ "insert_UserStar : ";

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
        
        let query = "INSERT INTO `UserStar` (firstname, lastname, birth, mail, password, sign_in_date, photo, name_spotify, name_deezer, name_youtube, name_bandcamp, id_profession, id_country) VALUES ('"+
        firstname+"', '"+lastname+"', '"+birth+"', '"+mail+"', AES_ENCRYPT('"+password+"', SHA2('"+key_str+"',512)) , '"+sign_in_date+"', '"+photo+"', '"+name_spotify+"', '"+name_deezer+"', '"+name_youtube+"', '"+name_bandcamp+"', '"+id_profession+"', '"+id_country+ "')";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },
    
    /**
    * This method is here to test that we can truly get mdp from database
    */
    getMdp_UserStar: (req, res) => {
        const fctLabel = fileLabel+ "getMdp_UserStar : ";

        let id = req.query.id ; 
        let mail = req.query.mail; 
        
        let querryForRaw = "SELECT id, password FROM adastra.userstar WHERE id='"+id+"'" ; 
        let querryForDecrypted = "SELECT id, CAST( aes_decrypt(password , SHA2('"+key_str+"',512)) AS CHAR(50) ) AS pass FROM adastra.userstar WHERE id="+id+"" ; 
        
        
        db.query(querryForRaw, (err, result) => {
            let resFromRawQuerry = "" ; 
            
            if (err)
            resFromRawQuerry = err ; 
            else
            resFromRawQuerry =  JSON.stringify(result) ;
            
            console.log(fctLabel+ resFromRawQuerry) ; 
            // res.send( resFromRawQuerry  ) ; 
        });
        
        db.query(querryForDecrypted, (err, result) => {
            let resFromDecryptedQuerry = "" ; 
            
            if (err)
            resFromDecryptedQuerry = err ; 
            else
            resFromDecryptedQuerry = JSON.parse( JSON.stringify(result) )[0] ;
            
            // delete the salt 
            try {
                resFromDecryptedQuerry.pass = resFromDecryptedQuerry.pass.slice(-0, -6);  
            } catch (TypeError) {
                console.log(fctLabel+ TypeError);
                let suspectedError = "error : There is a big chance you've tried to decrypt with a wrong key_string.";
                res.send(suspectedError); 
                return ;
            }
            
            console.log(fctLabel+ resFromDecryptedQuerry) ; 
            res.send( resFromDecryptedQuerry  ) ; 
        });
    },
    
    delete_UserStar: (req, res) => {
        const fctLabel = fileLabel+ "delete_UserStar : ";

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