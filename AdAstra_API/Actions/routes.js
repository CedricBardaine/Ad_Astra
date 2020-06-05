const path = require('path');

module.exports = {
    addSomethingPage: (req, res) => {
        res.sendFile(path.join(__dirname+'/../addSomething.html'));
    }
};