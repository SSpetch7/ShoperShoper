var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    slug : {
        type: String
    }
});

module.exports = mongoose.model('Category', categorySchema);