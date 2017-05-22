var Bookings = require('../models/bookingsModel');

var configData = require('../common/config');
var EncryptionService = require('../common/EncryptionService');

var successResponse = configData.successResponse;
var errorResponse = configData.errorResponse;

var express = require('express');
var router = express.Router();

router.route('/addbooking').post(function(req,res){
    var bookingsObj = new Bookings(req.body);
    bookingsObj.save(function(err,data) {
        if (data && !err) {
            successResponse.data = data;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
        }else {
            errorResponse.data = err;
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
    });
});
  
router.route('/getallbookings').get(function(req, res) {
    Bookings.find().exec(function(err, users) {
      if (users && !err) {
        successResponse.data = users;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));  
      }else {
        errorResponse.data = 'No bookings found';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
      }
      
    });
});

router.route('/bookings/:id').get(function(req,res){
    Bookings.findOne({ _id: req.params.id }, function(err, userObj) {
        if(userObj && !err){
            successResponse.data = userObj;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
        }else {
            errorResponse.data = 'Unable to find the booking';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
        
    });
});

router.route('/getbookingsbydateandcourt').post(function(req,res){
    Bookings.find({ bookedfordate : {$gte : configData.formatDate(req.body.bookedfordate),$lt : configData.plusOneDay(req.body.bookedfordate)},courtid : req.body.courtid }, function(err, userObj) {
        if(userObj && !err){
            successResponse.data = userObj;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
        }else {
            errorResponse.data = 'Unable to find the booking';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
        }
        
    });
});

module.exports = router;
