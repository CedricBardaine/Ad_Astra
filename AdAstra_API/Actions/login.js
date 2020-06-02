module.exports = {
    
    login: (req, res) => {
        let userEmail = req.body.email ; 
        let userPassword = req.body.password ; 
        
        ret = {
            loginStatus: "",
            idUser: null
        }
        
        let query =  "SELECT id, CAST( aes_decrypt(password , 'Astron@ute_1_3_6_13') AS CHAR(50) ) AS pass "+
        "FROM adastra.userstar "+
        "WHERE mail='"+userEmail+"'" ; 
        
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err); 
            }
            else {
                resFromDecryptedQuerry = JSON.parse( JSON.stringify(result) )[0] ;
                
                // delete the salt 
                resFromDecryptedQuerry.pass = resFromDecryptedQuerry.pass.slice(-0, -6);  
                
                if ( resFromDecryptedQuerry.pass == userPassword ) {
                    ret.loginStatus = "ok";
                    ret.idUser = resFromDecryptedQuerry.id ; 
                    res.status(200).send(ret) ; 
                }
                else {
                    ret.loginStatus = "notok";
                    res.status(401).send(ret) ; 
                }

            }
        });
    }
    
    
};