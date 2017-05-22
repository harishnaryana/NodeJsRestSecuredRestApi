var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var reviewsSchema = mongoose.Schema({
    sourceid: {
        type: String,
        required: false,
        default: ""
    },
    reviews : [
        {
            giverid: {
                type: Schema.Types.ObjectId, 
                ref: 'userModel'
            },
            rating: {
                type: String,
                required: false,
                default: ""
            },
            review: {
                type: String,
                required: false,
                default: ""
            },
            createddate: {
                type: Date,
                required: false,
                default: Date.now
            },
        }
    ]
});
module.exports = mongoose.model('reviewsModel', reviewsSchema);


