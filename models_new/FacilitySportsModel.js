var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var facilitySportsSchema = mongoose.Schema({
    userid: {
        type: Schema.Types.ObjectId,
        required : false,
        ref: 'userModel'
    },
    facilityid: {
        type: Schema.Types.ObjectId, 
        required : false,
        ref: 'facilityModel'
    },
    sportsid: {
        type: Schema.Types.ObjectId, 
        required : false,
        ref: 'sportsModel'
    },
    noofgrounds:{
        type: String,
        required: false,
        default: ""
    },
    bookingtype :{
        type: String,
        required: false,
        default: ""
    }
    
    
});
module.exports = mongoose.model('facilitySportsModel', facilitySportsSchema);


