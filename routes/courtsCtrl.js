var Courts = require('../models/courtsModel');

var configData = require('../common/config');
var EncryptionService = require('../common/EncryptionService');

var successResponse = configData.successResponse;
var errorResponse = configData.errorResponse;

var express = require('express');
var router = express.Router();




router.route('/addcourt').post(function(req,res){
    var courtsObj = new Courts(req.body);
    courtsObj.save(function(err,data) {
        if (data && !err) {
            successResponse.data = data;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
        }else {
            errorResponse.data = err;
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));
        }
    });
});


router.route('/getallcourts').get(function(req, res) {
    Courts.find().exec(function(err, data) {
      if (data && !err) {
        successResponse.data = data;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));  
      }else {
        errorResponse.data = 'No courts found';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
      }
      
    });
});

router.route('/getallunapprovedcourts').get(function(req, res) {
    Courts.find({approved:false,active:true}).exec(function(err, data) {
      if (data && !err) {
        successResponse.data = data;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));  
      }else {
        errorResponse.data = 'No courts found';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
      }
      
    });
});

router.route('/courts/:id').get(function(req,res){
    Courts.findOne({ _id: req.params.id }).populate('facilityid').exec(function(err, eventObj) {
        if(eventObj && !err){
            successResponse.data = eventObj;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
        }else {
            errorResponse.data = 'Unable to find the court';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));
        }
        
    });
});


router.route('/getallcourtsbyfacility/:id').get(function(req, res) {
    Courts.find({active : true,approved : true, facilityid:req.params.id}).exec(function(err, data) {
      if (data && !err) {
        successResponse.data = data;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));  
      }else {
        errorResponse.data = 'No Courts found';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
      }
      
    });
});

router.route('/getallcourtsbyfacilityandsport/:id/:sport').get(function(req, res) {
    Courts.find({active : true,approved : true, facilityid:req.params.id,sport:req.params.sport}).exec(function(err, data) {
      if (data && !err) {
        successResponse.data = data;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));  
      }else {
        errorResponse.data = 'No Courts found';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
      }
      
    });
});

router.route('/courts/:id').put(function(req,res){
    Courts.findOne({ _id: req.params.id }, function(err, userObj) {
        if(userObj && !err){
            for(var prop in req.body) {
                userObj[prop] = req.body[prop];
            }
            
            // save the Village
            userObj.save(function(err) {
                if (err) {
                    errorResponse.data = 'Unable to  update the Court';
                    return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
                }else {
                    successResponse.data = "Court updated Successfully";
                    res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
                }
                
            });
        }else {
            errorResponse.data = 'Unable to find the Court for update';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
    });
});

router.route('/courts/:id').delete(function(req, res) {
    Courts.remove({_id: req.params.id}, function(err, userObj) {
        if((userObj) && !err){
            successResponse.data = "Court Removed Successfully";
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
        }else {
            errorResponse.data = 'Unable to remove the Court';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
        
    });
});






module.exports = router;
