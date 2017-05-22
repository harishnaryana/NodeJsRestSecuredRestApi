var Facility = require('../models/facilityModel');

var configData = require('../common/config');
var EncryptionService = require('../common/EncryptionService');

var successResponse = configData.successResponse;
var errorResponse = configData.errorResponse;

var express = require('express');
var router = express.Router();




router.route('/addfacility').post(function(req,res){
    var facilityObj = new Facility(req.body);
    facilityObj.save(function(err,data) {
        if (data && !err) {
            successResponse.data = data;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
        }else {
            errorResponse.data = err;
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));
        }
    });
});


router.route('/getallfacilities').get(function(req, res) {
    Facility.find().exec(function(err, data) {
      if (data && !err) {
        successResponse.data = data;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));  
      }else {
        errorResponse.data = 'No Facilities found';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
      }
    });
});

router.route('/getallunapprovedfacilities').get(function(req, res) {
    Facility.find({approved:false,active:true}).exec(function(err, data) {
      if (data && !err) {
        successResponse.data = data;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));  
      }else {
        errorResponse.data = 'No Facilities found';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
      }
    });
});

router.route('/getallfacilitiesbysport').post(function(req, res) {
    Facility.find({sportz : {$in :req.body.sport}, active : true, approved : true, location : new RegExp(req.body.location,'i')}).exec(function(err, data) {
      if (data && !err) {
        successResponse.data = data;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));  
      }else {
        errorResponse.data = 'No Facilities found';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
      }
      
    });
});

router.route('/getallfacilitiesbyuser/:id').get(function(req, res) {
    Facility.find({userid:req.params.id , active : true, approved : true}).exec(function(err, data) {
      if (data && !err) {
        successResponse.data = data;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));  
      }else {
        errorResponse.data = 'No Facilities found';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
      }
      
    });
});

router.route('/facilities/:id').put(function(req,res){
    Facility.findOne({ _id: req.params.id }, function(err, userObj) {
        if(userObj && !err){
            for(var prop in req.body) {
                userObj[prop] = req.body[prop];
            }
            
            // save the Village
            userObj.save(function(err) {
                if (err) {
                    errorResponse.data = 'Unable to  update the facility';
                    return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
                }else {
                    successResponse.data = "facility updated Successfully";
                    res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
                }
                
            });
        }else {
            errorResponse.data = 'Unable to find the facility for update';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
    });
});

router.route('/facilities/:id').delete(function(req, res) {
    Facility.remove({_id: req.params.id}, function(err, userObj) {
        if((userObj) && !err){
            successResponse.data = "facilitiy Removed Successfully";
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
        }else {
            errorResponse.data = 'Unable to remove the facilitiy';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
        
    });
});




module.exports = router;
