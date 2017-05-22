var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var sportzSchema = mongoose.Schema({
    userid: {
        type: Schema.Types.ObjectId, 
        ref: 'userModel'
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
    location : {
        type: String,
        required: false,
        default : ''
    },
    coordinates : {
        lat : {
            type: String,
            required: false,
            default : ''
        },
        lang : {
            type: String,
            required: false,
            default : ''
        }
    },
    createddate: {
        type: Date,
        required: false,
        default: Date.now
    },
    startdate: {
        type: Date,
        required: false,
        default: Date.now
    },
    enddate: {
        type: Date,
        required: false,
        default: Date.now
    },
    contact : {
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
    },
    approved : {
        type: Boolean,
        required: false,
        default : false
    },
    rejected : {
        type: Boolean,
        required: false,
        default : false
    },
    images : [String]
});
module.exports = mongoose.model('sportzModel', sportzSchema);


