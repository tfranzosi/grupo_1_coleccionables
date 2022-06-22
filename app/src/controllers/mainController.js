const db = require('../../public/db/db.json');

mainController={
    index: (req, res) => {
        res.render('index', {db: db});
    }

}

module.exports=mainController;