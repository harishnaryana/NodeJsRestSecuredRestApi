var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = Schema({
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
    displayname: {
        type: String,
        required: false,
        default: ""
    },
    gender: {
        type: String,
        required: false,
        default: ""
    },
    status: { // Active/Approved/Onhold/Canceled/Locked/VerificationPending/PendingforApproval/Rejected
        type: String,
        required: false,
        default: ''
    },
    reason: { // Approved Pending - for approval  In proper behaviour Bad mail id / Password issue / Email not verified
        type: String,
        required: false,
        default: ''
    },
    registereddate: {
        type: Date,
        required: false,
        default: new Date()
    },
    inheriteduserid : {
        type: [String],
        required: false,
        default: []
    },
    inherited : {
        type: Boolean,
        required: false,
        default: false
    },
    usertype : { // Admin - User- FacilityManager - TournamentPoster - All -checkbox -user default
        type: String, //Admin, general user, Facility manager, Tournament Poster, F & T  , F T G, Inherit
        required: false,
        default: ''
    },
    emailverified : {
        type: Boolean,
        required: false,
        default: false
    }
    

});
module.exports = mongoose.model('userModel', userSchema);


