var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: false,
        default: ""
    },

    password: {
        type: String,
        required: false,
        select : false,
    },
    mobile: {
        type: String,
        unique: true,
        required: false,
        default: ""
    },
    profilepicture: {
        type: String,
        required: false,
        default: ""
    },

    nickname: {
        type: String,
        required: false,
        default: ""
    },
    gender: {
        type: String,
        required: false,
        default: ""
    },
    
    
    
    isadmin: {
        type: Boolean,
        required: false,
        default: false
    },
    
    status: {
        type: Boolean,
        required: false,
        default: false
    },
    
    registereddate: {
        type: Date,
        required: false,
        default: new Date()
    },
    requestforfacilitymanaging : {
        type: Boolean,
        required: false,
        default: false
    },
    isfacilitymanager : {
        type: Boolean,
        required: false,
        default: false
    },
    requestfortournamentsposting : {
        type: Boolean,
        required: false,
        default: false
    },
    istournamentsposter : {
        type: Boolean,
        required: false,
        default: false
    },
    isuser : {
        type: Boolean,
        required: false,
        default: false
    },
    devicetoken: {
        type: String,
        required: false,
        default: ""
    },
    emailverified : {
        type: Boolean,
        required: false,
        default: false
    },
    rejected : {
        type: Boolean,
        required: false,
        default: false
    },
    settings : {
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
        location : {
            type: String,
            required: false,
            default: ''
        },
        sportz : {
            type: [String],
            required: false,
            default:[]
        },
        
    }
});
module.exports = mongoose.model('userModel', userSchema);


