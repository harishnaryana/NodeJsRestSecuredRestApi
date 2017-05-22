var DeviceToken = require('../models/deviceTokenModel');

var configData = require('../common/config');
var EncryptionService = require('../common/EncryptionService');

var successResponse = configData.successResponse;
var errorResponse = configData.errorResponse;

var express = require('express');
var router = express.Router();

router.route('/registerdevicetoken').post(function(req,res){
    var deviceTokenObj = new DeviceToken(req.body);
    deviceTokenObj.save(function(err,data) {
        if (data && !err) {
            successResponse.data = data;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
        }else {
            errorResponse.data = err;
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
    });
});
  
router.route('/getalldevicetokens').get(function(req, res) {
    DeviceToken.find().exec(function(err, users) {
      if (users && !err) {
        successResponse.data = users;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));  
      }else {
        errorResponse.data = 'No device tokens found';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
      }
      
    });
});


module.exports = router;
