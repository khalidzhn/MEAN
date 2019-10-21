const express = require("express");
const app = express();
app.listen(8000, () => console.log("listening on port 8000"));
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.get("/", (req, res) => {
    res.render('index');
});
app.get("/cats", (req, res) => {
    res.render('cats');
});
app.get("/cat1", (req, res) => {
    var cat_info = [
        { name: "Luna", age: "5" }
    ];
    res.render('cat', { info: cat_info });
});
app.get("/cat3", (req, res) => {
    var cat_info = [
        { name: "Bella", age: "2" }
    ];
    res.render('cat', { info: cat_info });
});
app.get("/cat2", (req, res) => {
    var cat_info = [
        { name: "Lucy", age: "2" }
    ];
    res.render('cat', { info: cat_info });
});
app.get("/cat4", (req, res) => {
    var cat_info = [
        { name: "Zoe", age: "6" }
    ];
    res.render('cat', { info: cat_info });
});
