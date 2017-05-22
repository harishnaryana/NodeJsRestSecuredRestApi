var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var facilitySchema = mongoose.Schema({
    userid: {
        type: Schema.Types.ObjectId, 
        ref: 'userModel'
    },
    title : {
        type: String,
        required: false,
        default : ''
    },
    titleslug : {
        type: String,
        required: false,
        default : ''
    },
    description : {
        type: String,
        required: false,
        default : ''
    },
    sports : [
        {
            type: Schema.Types.ObjectId, 
            ref: 'sportsModel'
        }
    ],
    location : {
        type: String,
        required: false,
        default : ''
    },
    
    lattitude : {
        type: String,
        required: false,
        default : ''
    },
    longitude : {
        type: String,
        required: false,
        default : ''
    },
    
    createddate: {
        type: Date,
        required: false,
        default: new Date()
    },
    
    phone : {
        type: String,
        required: false,
        default : ''
    },
    email : {
        type: String,
        required: false,
        default : ''
    },
    website : {
        type: String,
        required: false,
        default : ''
    },
     address : {
        type: String,
        required: false,
        default : ''
    },
    
    approved : {
        type: Boolean,
        required: false,
        default : true
    },
    active : {
        type: Boolean,
        required: false,
        default : true
    },
    images : [String]
});
module.exports = mongoose.model('facilityModel', facilitySchema);


