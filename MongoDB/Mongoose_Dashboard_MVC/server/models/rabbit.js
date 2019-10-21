mongoose = require('../config/mongoose.js')

const rabbitSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    favorite_food: { type: String, required: true, minlength: 2 }
}, { timestamps: true })
// create an object to that contains methods for mongoose to interface with MongoDB
module.exports = mongoose.model('rabbit', rabbitSchema);

