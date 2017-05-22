var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var preferencesSchema = Schema({
    userid : {
        type: Schema.Types.ObjectId, 
        ref: 'userModel'
    },
    facilityid : {  // ignore now
        type: Schema.Types.ObjectId, 
        ref: 'facilityModel'
    },
    sportsid : { // ignore now
        type: Schema.Types.ObjectId, 
        ref: 'sportsModel'
    },
    notification : {
        type: Boolean,
        required: false,
        default: false
    },
    receivesms : {
        type: Boolean,
        required: false,
        default: false
    },
    receivepushnotifications : {
        type: Boolean,
        required: false,
        default: false
    },
    receiveemails : {
        type: Boolean,
        required: false,
        default: false
    },
    lattitude : {
        type: String,
        required: false,
        default: ''
    },
    longitude : {
        type: String,
        required: false,
        default: ''
    }
});

module.exports = mongoose.model('preferencesModel', preferencesSchema);


