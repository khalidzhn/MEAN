mongoose = require('../config/mongoose.js')
const QuoteSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2 },
    message: { type: String, required: true, minlength: 2 }
}, { timestamps: true })
// create an object to that contains methods for mongoose to interface with MongoDB
module.exports = mongoose.model('Quote', QuoteSchema);
