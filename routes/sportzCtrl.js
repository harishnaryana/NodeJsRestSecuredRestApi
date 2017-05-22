var Sportz = require('../models/sportzModel');

var configData = require('../common/config');
var EncryptionService = require('../common/EncryptionService');

var successResponse = configData.successResponse;
var errorResponse = configData.errorResponse;

var express = require('express');
var router = express.Router();




router.route('/addsportz').post(function(req,res){
    var sportzObj = new Sportz(req.body);
    sportzObj.save(function(err,data) {
        if (data && !err) {
            successResponse.data = data;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
        }else {
            errorResponse.data = err;
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));
        }
    });
});

router.route('/getallsportz').get(function(req, res) {
    Sportz.find({}).populate('userid').exec(function(err, events) {
      if (events && !err) {
        successResponse.data = events;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));  
      }else {
        errorResponse.data = 'No Sportz found';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
      }
      
    });
});

router.route('/getallrejectedsportz').get(function(req, res) {
    Sportz.find({rejected:true}).populate('userid').exec(function(err, events) {
      if (events && !err) {
        successResponse.data = events;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));  
      }else {
        errorResponse.data = 'No Sportz found';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
      }
      
    });
});

router.route('/getallactiveapprovedsportz').post(function(req, res) {
    var perPage = configData.MAX_RECORDS_TO_FETCH
    , page = req.param('page') > 0 ? req.param('page') : 0;
   
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() - 1); 
    todayDate = todayDate.toLocaleDateString();
    
    var location = new RegExp(req.body.location,'i');
    
    Sportz.find({startdate: {$gte : new Date(todayDate)},approved:true,rejected:false}).or({location:location})
    .sort({date: 'desc'}).limit(perPage).skip(perPage * page)
    .populate('userid').exec(function(err, events) {
      if (events && !err) {
        successResponse.data = events;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));  
      }else {
        errorResponse.data = 'No Sportz found';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
      }
      
    });
});

router.route('/getallactiveunapprovedsportz').get(function(req, res) {
    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() - 1);
    todayDate = todayDate.toLocaleDateString();
    Sportz.find({startdate: {$gte : new Date(todayDate)},approved:false,rejected:false}).populate('userid').exec(function(err, events) {
      if (events && !err) {
        successResponse.data = events;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));  
      }else {
        errorResponse.data = 'No Sportz found';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
      }
      
    });
});


router.route('/searchapprovedsportz').post(function(req, res) {
    var queryFirstPart = {approved: true,rejected:false};
    var querySecondPart = [];
    
    if(req.body.startdate){
    	var stdt = lessOneDay(req.body.startdate);
    	queryFirstPart.startdate = {$gte : new Date(stdt)};
    }else {
      var stdt = lessOneDay(new Date());
    	queryFirstPart.startdate = {$gte : new Date(stdt)};
    }
    
    
    if(req.body.location){
    	var loctn = new RegExp(req.body.location,'i');
    	queryFirstPart.location = loctn;
    }
    
    if(req.body.sportz.length >= 1){
    	querySecondPart = formSportzQuery(req.body.sportz);
    }else {
    	querySecondPart = [];
    }
    
    console.log(queryFirstPart);
    console.log(querySecondPart);
    
// Sportz.find({startdate: {$gte : new Date(todayDate)},approved:true,location:new RegExp(loc,'i')}).or([{sport : 'Cricket'},{sport : 'Badminton'}]).populate('userid').exec(function(err, events) {

    Sportz.find(queryFirstPart).or(querySecondPart).populate('userid').exec(function(err, events) {
      if (events && !err) {
        successResponse.data = events;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));  
      }else {
        errorResponse.data = 'No Sportz found';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));
      }
      
    });
});


function plusOneDay(date){
  var todayDate = new Date(date);
  todayDate.setDate(todayDate.getDate()+1); 
  todayDate = todayDate.toLocaleDateString();
  return todayDate;
}

function lessOneDay(date){
  var todayDate = new Date(date);
  todayDate.setDate(todayDate.getDate() - 1); 
  todayDate = todayDate.toLocaleDateString();
  return todayDate;
}

function formSportzQuery(sportz){
  var sportzQuery = [];
  for(var i=0;i<sportz.length;i++){
    var obj = {};
    obj.sport = sportz[i];
    sportzQuery.push(obj);
  }
  return sportzQuery;
}

router.route('/getallactivesportz').get(function(req, res) {
    Sportz.find({startdate: {$gt : new Date()},approved:true,rejected:false}).populate('userid').exec(function(err, events) {
      if (events && !err) {
        successResponse.data = events;
        res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));  
      }else {
        errorResponse.data = 'No Sportz found';
        return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));  
      }
      
    });
});

router.route('/sportz/:id').get(function(req,res){
    Sportz.findOne({ _id: req.params.id }, function(err, eventObj) {
        if(eventObj && !err){
            successResponse.data = eventObj;
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));    
        }else {
            errorResponse.data = 'Unable to find the event';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));
        }
        
    });
});

router.route('/sportz/:id').delete(function(req, res) {
    Sportz.remove({_id: req.params.id}, function(err, userObj) {
        if((userObj) && !err){
            successResponse.data = "Sport Removed Successfully";
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
        }else {
            errorResponse.data = 'Unable to remove the Sport';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));
        }
        
    });
});



router.route('/sportz/:id').put(function(req,res){
    Sportz.findOne({ _id: req.params.id }, function(err, eventObj) {
        if(eventObj && !err){
            for(var prop in req.body) {
                eventObj[prop] = req.body[prop];
            }
            
            eventObj.save(function(err) {
                if (err) {
                    errorResponse.data = 'Unable to  update the Sportz';
                    return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));
                }
                successResponse.data = "Sportz updated Successfully";
                res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
            });
        }else {
            errorResponse.data = 'Unable to find the Sportz for update';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));
        }
    });
});






/*router.route('/removeallsportz').delete(function(req, res) {
    Sportz.remove({}, function(err, userObj) {
        if((userObj) && !err){
            successResponse.data = "All Sports Removed Successfully";
            res.send(EncryptionService.encryptData(JSON.stringify(successResponse)));
        }else {
            errorResponse.data = 'Unable to remove the Sports';
            return res.send(EncryptionService.encryptData(JSON.stringify(errorResponse)));
        }
        
    });
});*/




module.exports = router;
