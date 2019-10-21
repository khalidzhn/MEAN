const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MD_DB', { useNewUrlParser: true });

module.exports = mongoose;
