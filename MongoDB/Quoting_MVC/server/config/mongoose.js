const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/qouts_DB', { useNewUrlParser: true });

module.exports = mongoose;
