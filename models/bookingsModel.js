var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var bookingsSchema = mongoose.Schema({
    userid: {
        type: Schema.Types.ObjectId, 
        ref: 'userModel'
    },
    courtid: {
        type: Schema.Types.ObjectId, 
        ref: 'courtsModel'
    },
    facilityid: {
        type: Schema.Types.ObjectId, 
        ref: 'facilityModel'
    },
    createddate: {
        type: Date,
        required: false,
        default: ""
    },
    bookedfordate: {
        type: Date,
        required: false,
        default: ""
    },
    bookedhours : [String]
    
});
module.exports = mongoose.model('bookingsModel', bookingsSchema);


