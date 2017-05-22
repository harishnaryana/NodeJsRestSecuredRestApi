var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var timeslotsSchema = mongoose.Schema({
    groundid: {
        type: Schema.Types.ObjectId, 
        ref: 'groundModel'
    },
    from : {
        type: String,
        required: false,
        default : ''
    },
    to : {
        type: String,
        required: false,
        default : ''
    },
    price : {
        type: String,
        required: false,
        default : ''
    },
    players : {
        type: String,
        required: false,
        default : ''
    },    
    createddate: {
        type: Date,
        required: false,
        default: new Date()
    }
});
module.exports = mongoose.model('timeslotsModel', timeslotsSchema);


