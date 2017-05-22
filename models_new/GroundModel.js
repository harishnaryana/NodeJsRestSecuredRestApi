var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var groundSchema = mongoose.Schema({
    facilitysportsid: {
        type: Schema.Types.ObjectId, 
        ref: 'facilitySportsModel'
    },
    amenities:[
        {
            type: Schema.Types.ObjectId, 
            ref: 'amenitiesModel'
        }
    ],
    unavailable:{
        type: [String],
        required: false,
        default: ""
    },
    createddate :{
        type: Date,
        required: false,
        default: new Date()
    }
    
    
});
module.exports = mongoose.model('groundModel', groundSchema);


