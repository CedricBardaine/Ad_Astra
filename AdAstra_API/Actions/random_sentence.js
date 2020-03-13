module.exports = {
    insert_RandomSentence: (req, res) => {
        let content = req.body.content; 
        console.log(content) ; 

        let query = "INSERT INTO `Random_sentence` (content) VALUES ('" +
        content + "')";
        db.query(query, (err, result) => {
            if (err) {
                console.log("BAD INSERT"); 
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },

    delete_RandomSentence: (req, res) => {
        let lid = req.body.id; 
        console.log(lid) ; 

        let query = "DELETE FROM `Random_sentence` WHERE id= ('" +
        lid + "')";
        db.query(query, (err, result) => {
            if (err) {
                console.log("BAD INSERT"); 
                return res.status(500).send(err); 
            }
            res.send(result) ; 
        });
    },

    getRandom_RandomSentence: (req, res) => {
        let query = "SELECT * FROM Random_sentence ORDER BY RAND() LIMIT 1;"; 
        db.query(query, (err , result) => {
            if (err) {
                console.log("BAD RANDOM GET"); 
                return res.status(500).send(err); 
            }
            if ( result ) {
                res.send(result); 
            }   
        }); 
    }
};