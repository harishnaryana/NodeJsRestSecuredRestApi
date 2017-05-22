var mongoose = require('mongoose');

var amenitiesSchema = mongoose.Schema({
    name : {
        type: String,
        required: false,
        default : ''
    },
    value : {
        type: String,
        required: false,
        default : ''
    }
});
module.exports = mongoose.model('amenitiesModel', amenitiesSchema);


