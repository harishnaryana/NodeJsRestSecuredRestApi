var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var errorSchema = mongoose.Schema({
    description: {
        type: String,
        required: false
    },
    useragent: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        required: false,
        default: Date.now
    },
});
module.exports = mongoose.model('errorModel', errorSchema);


