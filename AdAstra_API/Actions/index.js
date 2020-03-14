const path = require('path');

module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `testtmp` ORDER BY id ASC"; // query database to get all the players

        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            console.log(result); 
            console.log("_______________________");
            res.sendFile(path.join(__dirname+'./../index.html'));
        });
    },
};
