var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var courtsSchema = mongoose.Schema({
    facilityid: {
        type: Schema.Types.ObjectId, 
        ref: 'facilityModel'
    },
    title : {
        type: String,
        required: false,
        default : ''
    },
    description : {
        type: String,
        required: false,
        default : ''
    },
    sport : {
        type: String,
        required: false,
        default : ''
    },
    price : {
       rate : {
           type: String,
            required: false,
            default : ''
       },
       per : {
           type: String,
            required: false,
            default : ''
       },
       currency : {
           type: String,
            required: false,
            default : ''
       },
    },
    details : {
        size : {
            type: String,
            required: false,
            default : ''
        },
        type : {
            type: String,
            required: false,
            default : ''
        },
        extrafeatures : {
            type: String,
            required: false,
            default : ''
        }
    },
    createddate: {
        type: Date,
        required: false,
        default: ''
    },
    approved : {
        type: Boolean,
        required: false,
        default : false
    },
    active : {
        type: Boolean,
        required: false,
        default : true
    },
    images : [String]
});
module.exports = mongoose.model('courtsModel', courtsSchema);


