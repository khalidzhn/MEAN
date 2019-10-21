const rabbits = require('../contrallers/rabbits.js')


module.exports = function (app) {

    app.get('/quotes', (req, res) => {
        quotes.index(req, res);

    });

    app.get("/", (req, res) => {
        rabbits.index(req, res);
    });

    app.get('/rabbit/new', (req, res) => {
        rabbits.new(req, res);
    });

    app.post('/add', (req, res) => {
        rabbits.create(req, res);

    });

    app.get('/rabbit/:id', function (req, res) {
        rabbits.one(req, res);
    });

    app.get('/rabbit/edit/:id', function (req, res) {
        rabbits.edit(req, res);
    });

    app.post('/change/:id', function (req, res) {
        rabbits.change(req, res);
    });


    app.post('/delete/:id', function (req, res) {
        rabbits.delete(req,res);
    })


}

