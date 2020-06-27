const jwt = require('jsonwebtoken') ; 

const fs = require('fs');
const key_str = fs.readFileSync('./pass.txt', 'utf8') ; 

module.exports = {
    
    login: (req, res) => {
        let userEmail = req.body.email ; 
        let userPassword = req.body.password ; 
        
        ret = {
            loginStatus: "",
            idUser: null,
            token: null
        }
        
        // let query =  "SELECT id, CAST( aes_decrypt(password , 'Astron@ute_1_3_6_13') AS CHAR(50) ) AS pass "+
        let query =  "SELECT id, CAST( aes_decrypt(password , SHA2('"+key_str+"',512)) AS CHAR(50) ) AS pass "+
        "FROM adastra.userstar "+
        "WHERE mail='"+userEmail+"'" ; 
        
        db.query(query, (err, result) => {
            console.log(result) ; 
            
            if (err) {
                return res.status(500).send(err); 
            }
            else {
                
                /* the email doesn't match any UserStar */
                if (result == [] || result == null || result.length == 0 ) {
                    ret.loginStatus = "notok";
                    res.status(401).send(ret); 
                }
                else {
                    
                    resFromDecryptedQuerry = JSON.parse( JSON.stringify(result) )[0] ;
                    
                    // delete the salt 
                    resFromDecryptedQuerry.pass = resFromDecryptedQuerry.pass.slice(-0, -6);  
                    
                    /* the password matches */
                    if ( resFromDecryptedQuerry.pass == userPassword ) {
                        let payload = { subject: resFromDecryptedQuerry.id };
                        let token = jwt.sign(payload, 'secret_etoile');
                        
                        ret.loginStatus = "ok";
                        ret.idUser = resFromDecryptedQuerry.id ; 
                        ret.token = token ; 
                        
                        res.status(200).send(ret) ; 
                    }
                    else {
                        ret.loginStatus = "notok";
                        res.status(401).send(ret) ; 
                    }
                    
                }
            }
        });
    },
    
    verifyLogged: (req , res) => {
        console.log("verified : ",  req.userId) ; 
        res.status(200).send("ok"); 
    },
    getLoggedUserId: (req , res) => {
        console.log("get : ",  req.userId) ; 
        res.status(200).send(req.userId+""); // '+""' is necessary to explicitely make it String, if missing, the status code take the value. 
    }
};