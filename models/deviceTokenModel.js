var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var deviceTokenSchema = mongoose.Schema({
    devicetoken: {
        type: String,
        required: false,
        unique : true
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
module.exports = mongoose.model('deviceTokenModel', deviceTokenSchema);


