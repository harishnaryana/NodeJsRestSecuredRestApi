var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var sportsSchema = Schema({
    game: {
        type: String,
        required: false,
        default: ""
    },
    gameslug: {
        type: String,
        required: false,
        default: ""
    },
    facilityrequired : {
        type: Boolean,
        required: false,
        default: false
    },
    teamsize : {
        type: String,
        required: false,
        default: ""
    },
    noofgroups : {
        type: String,
        required: false,
        default: ""
    },
    playkits : {
        type: String,
        required: false,
        default: ""
    },
    gameicon :{
        type: String,
        required: false,
        default: ""
    }
});

module.exports = mongoose.model('sportsModel', sportsSchema);


