const express = require('express');
const app = express();
const server = app.listen(1337);
var count = 0;


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


app.get('/', (req, res) => {
    res.render('index', { count });
});

const io = require('socket.io').listen(server);

io.sockets.on('connection', socket => {
    console.log('New socket connection');
    console.log(`Socket ID: ${socket.id}`);

    socket.on('count_clicked', () => {
        console.log('Count button clicked');
        count++;
        io.emit('count_response', { response: count });
    });

    socket.on('reset_clicked', () => {
        console.log('Reset button clicked');
        count = 0;
        io.emit('reset_response', { response: count });
    });
});