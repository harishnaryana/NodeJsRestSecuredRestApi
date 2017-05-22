var Reviews = require('../models/reviewsModel');

var configData = require('../common/config');
var EncryptionService = require('../common/EncryptionService');

var successResponse = configData.successResponse;
var errorResponse = configData.errorResponse;

var express = require('express');
var router = express.Router();

router.route('/addreview').post(function(req,res){
    var reviewsObj = new Reviews(req.body);
    reviewsObj.save(function(err,data) {
        if (data && !err) {
            successResponse.data = data;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
        }else {
            errorResponse.data = err;
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
    });
});
  
router.route('/getallreviews').get(function(req, res) {
    Reviews.find().exec(function(err, users) {
      if (users && !err) {
        successResponse.data = users;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));  
      }else {
        errorResponse.data = 'No Reviews found';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
      }
      
    });
});

router.route('/reviews/:sourceid').get(function(req,res){
    Reviews.find({ sourceid: req.params.sourceid }, function(err, userObj) {
        if(userObj && !err){
            successResponse.data = userObj;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
        }else {
            errorResponse.data = 'Unable to find the reviews';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
        
    });
});


module.exports = router;
